import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../models/Produto';
import { StorageService } from '../services/storage.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage {

  formProduto: FormGroup;
  produto: Produto = new Produto();
  produtos: Produto[];

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
    ],
    descricao: [
      { tipo: 'required', mensagem: 'O campo Descrição é obrigatório.' },
    ],
    preco: [
      { tipo: 'required', mensagem: 'O campo Preço é obrigatório.' },
    ],
    validade: [
      { tipo: 'required', mensagem: 'O campo Validade é obrigatório.' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private toastController: ToastController) {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required])],
      validade: ['', Validators.compose([Validators.required])]
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
    if (this.formProduto.valid) {
      let produtos = await this.storageService.get('produtos');

      if (!produtos) {
        produtos = [];
      }

      this.produto.nome = this.formProduto.value.nome;
      this.produto.descricao = this.formProduto.value.descricao;
      this.produto.preco = this.formProduto.value.preco;
      this.produto.validade = this.formProduto.value.validade;
      produtos.push(this.produto);

      await this.storageService.set('produtos', produtos);
      this.mostrarToast('Produto cadastrado', 'success');
    } else {
      this.mostrarToast('Informações inválidas', 'danger');
    }
  }

  async verProdutos() {
    const produtos = await this.storageService.get('produtos');
    console.log(produtos);
  }

  async getProdutos() {
    this.produtos = await this.storageService.get('produtos');
  }

  async deletar(produto: any) {
    const produtos = await this.storageService.get('produtos');
    const index = produtos.findIndex(prod => prod.nome === produto.nome);
    console.log(index);
    produtos.splice(index, 1);

    await this.storageService.set('produtos', produtos).then(() => {
      this.getProdutos();
      this.mostrarToast('Produto deletado', 'danger');
    });
  }
}
