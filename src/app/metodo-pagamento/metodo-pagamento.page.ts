import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { ComprasService } from '../services/compras.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.page.html',
  styleUrls: ['./metodo-pagamento.page.scss'],
})
export class MetodoPagamentoPage implements OnInit {
  codigoDesconto: string = '';
  descontoAplicado: boolean = false;
  mensagemDesconto: string = '';
  metodoPagamento: string = '';
  userId!: number;
  compraId!: number;
  
  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private produtosService: ProdutosService,
    private alertController: AlertController,
    private comprasService: ComprasService
  ) {
    this.route.paramMap.subscribe(params => {
    const state = history.state;
    if (state && state.userId) {
      this.userId = state.userId;
    }
    });
    this.route.paramMap.subscribe(params => {
      const state = history.state;
      if (state && state.compraId) {
        this.compraId = state.compraId;
      }
      });
  }

  ngOnInit() {
  }

  aplicarDesconto() {
    if (this.codigoDesconto.trim() === 'DESC10') {
      this.comprasService.updateValorDesconto(this.compraId, 10).subscribe();
      this.descontoAplicado = true;
      this.mensagemDesconto = 'Código de desconto foi aplicado';
    } else {
      this.descontoAplicado = false;
      this.mensagemDesconto = 'Código de desconto inválido!';
    }
  }
  updateMetodoPagamento(novoMetodoPagamento: string){
    this.comprasService.updateMetodoPagamento(this.compraId, novoMetodoPagamento).subscribe();
  }
}