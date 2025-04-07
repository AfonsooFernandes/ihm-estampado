import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { FavoritosService } from '../services/favoritos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userId!: number;
  produtos: Produto[] = [];
  mostrarDesconto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private favoritosService: FavoritosService,
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {
    this.route.paramMap.subscribe(params => {
      const state = history.state;
      if (state && state.userId) {
        this.userId = state.userId;
      }
    });
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'dark',
      position: 'bottom'
    });
    toast.present();
  }

  adicionarAoCarrinho(itemId: number, preco: number) {
    this.carrinhoService.adicionarItemCarrinho(this.userId, itemId, preco).subscribe(() => {
      this.presentToast('Item adicionado ao carrinho com sucesso.');
    }, error => {
      this.presentToast('Erro ao adicionar item ao carrinho.');
      console.error('Erro ao adicionar item ao carrinho:', error);
    });
  }

  adicionarAosFavoritos(itemId: number) {
    this.favoritosService.adicionarItemFavoritos(this.userId, itemId).subscribe(() => {
      this.presentToast('Item adicionado aos Favoritos com sucesso.');
    }, error => {
      this.presentToast('Erro ao adicionar item aos Favoritos.');
      console.error('Erro ao adicionar item aos Favoritos:', error);
    });
  }

  toggleDesconto() {
    this.mostrarDesconto = !this.mostrarDesconto;
  }
}
