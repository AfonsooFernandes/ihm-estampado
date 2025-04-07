import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoPagamentoPageRoutingModule } from './metodo-pagamento-routing.module';

import { MetodoPagamentoPage } from './metodo-pagamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoPagamentoPageRoutingModule
  ],
  declarations: [MetodoPagamentoPage]
})
export class MetodoPagamentoPageModule {}
