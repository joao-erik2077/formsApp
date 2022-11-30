import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../models/Produto';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  formProduto: FormGroup;
  produto: Produto = new Produto();

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

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required])],
      validade: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
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
    }
  }

  async verProdutos() {
    const produtos = await this.storageService.get('produtos');
    console.log(produtos);
  }

}
