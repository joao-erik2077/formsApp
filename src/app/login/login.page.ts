import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup;

  mensagens = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'O e-mail não é válido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo Senha é obrigatório.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter no mínimo 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 10 caracteres.' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router,
    private toastController: ToastController) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    });
  }

  async mostrarToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      color: color || 'primary',
      position: 'bottom'
    });

    await toast.present();
  }

  async fazerLogin() {
    const dados = await this.storageService.get(this.formLogin.value.email);
    if (dados && dados.senha === this.formLogin.value.senha) {
      this.mostrarToast(`Seja bem vindo ${dados.nome}`, 'success');
      this.route.navigateByUrl('/tabs/tab1');
    } else {
      this.mostrarToast('Usuário ou senha inválidos', 'danger');
    }
  }

}
