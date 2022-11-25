import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  formProduto: FormGroup;

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
