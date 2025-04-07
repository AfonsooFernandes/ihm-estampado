import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'produto-detalhes/:id',
    loadChildren: () => import('./produto-detalhes/produto-detalhes.module').then(m => m.ProdutoDetalhesPageModule)
  },
  {
    path: 'finalizar-compra',
    loadChildren: () => import('./finalizar-compra/finalizar-compra.module').then( m => m.FinalizarCompraPageModule)
  },
  {
    path: 'op-local',
    loadChildren: () => import('./op-local/op-local.module').then( m => m.OpLocalPageModule)
  },
  {
    path: 'metodo-pagamento',
    loadChildren: () => import('./metodo-pagamento/metodo-pagamento.module').then( m => m.MetodoPagamentoPageModule)
  },
  {
    path: 'confirmacao',
    loadChildren: () => import('./confirmacao/confirmacao.module').then( m => m.ConfirmacaoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
