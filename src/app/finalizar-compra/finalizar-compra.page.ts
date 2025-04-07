import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {
  nome: string = '';
  email: string = '';
  morada: string = '';
  rua: string = '';
  cidade: string = '';
  distrito: string = '';
  codigoPostal: string = '';
  isFormValid: boolean = false;

  userId!: number;
  compraId!: number;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private comprasService: ComprasService
  ) {
    this.route.paramMap.subscribe(params => {
      const state = history.state;
      if (state && state.userId) {
        this.userId = state.userId;
      }
      if (state && state.compraId) {
        this.compraId = state.compraId;
      }
    });
  }


  ngOnInit() {
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  checkForm() {
    this.isFormValid = this.nome.trim() !== '' && this.email.trim() !== '' && this.morada.trim() !== '' &&
                       this.rua.trim() !== '' && this.cidade.trim() !== '' && this.distrito.trim() !== '' &&
                       this.codigoPostal.trim().length === 8 && this.validateEmail(this.email);
  }

  formatCodigoPostal() {
    let valor = this.codigoPostal.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (valor.length > 7) {
      valor = valor.substring(0, 7); // Limita o comprimento a 7 dígitos
    }
    if (valor.length > 4) {
      valor = valor.substring(0, 4) + '-' + valor.substring(4); // Adiciona o hífen após o quarto dígito
    }
    this.codigoPostal = valor;
    this.checkForm(); // Verifica o formulário após formatar o campo
  }


  updateMoradaFaturacao() {
    this.comprasService.updateMoradaFaturacao(this.compraId,this.nome,this.email,this.morada).subscribe();
  }
  updateMoradaEntrega() {
    this.comprasService.updateMoradaEntrega(this.compraId, this.rua,this.cidade,this.distrito,this.codigoPostal).subscribe();
  }
}
