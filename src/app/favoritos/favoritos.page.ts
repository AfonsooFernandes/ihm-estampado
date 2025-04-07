import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { FavoritosService } from '../services/favoritos.service';
import { AlertController, MenuController } from '@ionic/angular';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  userId!: number;
  produtosNosFavoritos: Produto[] = [];
  mostrarDesconto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favortosService: FavoritosService,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController
  ) {
    this.route.paramMap.subscribe(params => {
      const state = history.state;
      if (state && state.userId) {
        this.userId = state.userId;
      }
    });
  }

  ngOnInit() {
    this.carregarProdutosNosFavoritos();
  }

  carregarProdutosNosFavoritos() {
    this.favortosService.getFavoritos(this.userId).subscribe(itemIds => {
      this.produtosNosFavoritos = [];
      itemIds.forEach(itemId => {
        this.produtosService.getProdutoById(itemId).subscribe(produto => {
          if (produto) {
            this.produtosNosFavoritos.push(produto);
          }
        });
      });
    });
  }

  async confirmarRemocao(itemId: number) {
    const alert = await this.alertController.create({
      header: 'Remover Item',
      message: 'Tem certeza que deseja remover este item dos Favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Remoção cancelada');
          }
        }, {
          text: 'Remover',
          handler: () => {
            this.removerDosFavoritos(itemId);
          }
        }
      ]
    });

    await alert.present();
  }

  removerDosFavoritos(itemId: number) {
    this.favortosService.removerItemFavoritos(this.userId, itemId).subscribe(() => {
      this.carregarProdutosNosFavoritos();
    });
  }

  adicionarAoCarrinho(itemId: number, preco: number) {
    this.carrinhoService.adicionarItemCarrinho(this.userId, itemId, preco).subscribe(() => {
      console.log('Item adicionado ao carrinho com sucesso.');
    }, error => {
      console.error('Erro ao adicionar item ao carrinho:', error);
    });
  }

  abrirProduto(produtoId: number) {
    this.router.navigate(['/produto-detalhes', produtoId]);
  }

  toggleDesconto() {
    this.mostrarDesconto = !this.mostrarDesconto;
  }

  // Adicionar método para abrir o menu
  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
