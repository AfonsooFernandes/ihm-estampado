import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { ComprasService } from '../services/compras.service';
import { AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
})
export class ConfirmacaoPage implements OnInit {
  itensCompra: Produto[] = [];
  total: number | null = 0;
  userId = 1; 
  compraId!: number; 

  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private produtosService: ProdutosService,
    private alertController: AlertController,
    private comprasService: ComprasService,
    private router: Router
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
    this.carregarProdutosCompra();
  }

  carregarProdutosCompra() {
    if (this.compraId) {
      this.comprasService.getCompra(this.compraId).subscribe(idItens => {
        if (idItens && idItens.length > 0) {
          const produtoObservables = idItens.map(id => this.produtosService.getProdutoById(id));
          forkJoin(produtoObservables).subscribe(produtos => {
            this.itensCompra = produtos.filter(produto => produto !== null) as Produto[];
            this.total = this.comprasService.getTotal(this.compraId);
          });
        } else {
          this.itensCompra = [];
          this.total = 0;
        }
      });
    }
  }

  async confirmarCompra() {
    const alert = await this.alertController.create({
      header: 'Compra Confirmada',
      message: 'Sua compra foi efetuada com sucesso!',
      buttons: ['OK']
    });

    await alert.present();

    await alert.onDidDismiss();

    this.carrinhoService.limparCarrinho(this.userId).subscribe(() => {
      this.router.navigate(['/home'], { state: { userId: this.userId } });
    });
  }
}