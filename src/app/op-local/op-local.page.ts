import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { ComprasService } from '../services/compras.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-op-local',
  templateUrl: './op-local.page.html',
  styleUrls: ['./op-local.page.scss'],
})
export class OpLocalPage implements OnInit {
  deliveryOption: string = '';
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
}
