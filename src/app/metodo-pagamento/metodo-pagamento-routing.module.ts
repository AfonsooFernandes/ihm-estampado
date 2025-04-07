import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoPagamentoPage } from './metodo-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoPagamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoPagamentoPageRoutingModule {}
