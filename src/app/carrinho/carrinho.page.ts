import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService, Produto } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { ComprasService } from '../services/compras.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  compraId!: number;
  userId!: number;
  produtosNoCarrinho: Produto[] = [];
  totalCarrinho: number = 0;
  tamanhos = ['XS', 'S', 'M', 'L', 'XL'];
  mostrarDesconto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private produtosService: ProdutosService,
    private alertController: AlertController,
    private comprasService: ComprasService,
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
    this.carregarProdutosNoCarrinho();
    this.comprasService.generateCompraId().subscribe(newCompraId => {
      this.compraId = newCompraId;
    });
  }

  carregarProdutosNoCarrinho() {
    this.carrinhoService.getCarrinho(this.userId).subscribe(itemIds => {
      this.produtosNoCarrinho = [];
      itemIds.forEach(itemId => {
        this.produtosService.getProdutoById(itemId).subscribe(produto => {
          if (produto) {
            this.produtosNoCarrinho.push(produto);
          }
        });
      });
      this.calcularTotalCarrinho();
    });
  }

  adicionarCompra() {
    this.comprasService.addCompra(
      this.compraId,
      this.userId,
      this.produtosNoCarrinho.map(produto => produto.id),
      0,
      this.totalCarrinho,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ).subscribe(
      async () => {
        console.log('Compra adicionada');
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Compra adicionada com sucesso!',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/compras']);
      },
      async (error) => {
        console.error('Erro ao adicionar compra', error);
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Ocorreu um erro ao adicionar a compra. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  calcularTotalCarrinho() {
    this.totalCarrinho = this.produtosNoCarrinho.reduce((total, produto) => total + produto.preco, 0);
  }

  async confirmarRemocao(itemId: number) {
    const alert = await this.alertController.create({
      header: 'Remover Item',
      message: 'Tem certeza que deseja remover este item do carrinho?',
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
            this.removerDoCarrinho(itemId);
          }
        }
      ]
    });

    await alert.present();
  }

  removerDoCarrinho(itemId: number) {
    this.carrinhoService.removerItemCarrinho(this.userId, itemId).subscribe(() => {
      this.carregarProdutosNoCarrinho();
    });
  }

  abrirProduto(produtoId: number) {
    this.router.navigate(['/produto-detalhes', produtoId]);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  toggleDesconto() {
    this.mostrarDesconto = !this.mostrarDesconto;
  }
}
