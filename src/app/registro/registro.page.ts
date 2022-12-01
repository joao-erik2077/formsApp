import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { StorageService } from '../services/storage.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  formRegistro: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O CPF deve ter 11 caracteres.', },
      { tipo: 'maxlength', mensagem: 'O CPF deve ter 11 caracteres.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo Senha é obrigatório.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 10 caractéres.' },
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 10 caractéres.' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router,
    private toastController: ToastController) {
    this.formRegistro = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
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

  async salvarCadastro() {
    if (this.formRegistro.valid) {
      this.usuario.nome = this.formRegistro.value.nome;
      this.usuario.cpf = this.formRegistro.value.cpf;
      this.usuario.email = this.formRegistro.value.email;
      this.usuario.senha = this.formRegistro.value.senha;
      await this.storageService.set(this.usuario.email, this.usuario);
      this.mostrarToast('Usuário cadastrado', 'success');
      this.route.navigateByUrl('/login');
    } else {
      this.mostrarToast('Erro ao cadastrar', 'danger');
    }
  }

}
