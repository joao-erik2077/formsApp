import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  formProduto: FormGroup;

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

  constructor(private formBuilder: FormBuilder) {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required])],
      validade: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  salvarCadastro() {
    console.log(`Formulário: ${this.formProduto.valid}`);
  }

}
