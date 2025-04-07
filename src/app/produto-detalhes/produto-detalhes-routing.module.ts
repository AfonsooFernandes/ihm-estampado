import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoDetalhesPage } from './produto-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoDetalhesPageRoutingModule {}
