import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarCompraPage } from './finalizar-compra.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarCompraPageRoutingModule {}
