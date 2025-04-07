import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { ProdutoDetalhesPage } from './produto-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdutoDetalhesPage]
})
export class ProdutoDetalhesPageModule {}
