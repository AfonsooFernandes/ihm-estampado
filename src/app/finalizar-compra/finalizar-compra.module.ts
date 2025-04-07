import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarCompraPageRoutingModule } from './finalizar-compra-routing.module';

import { FinalizarCompraPage } from './finalizar-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarCompraPageRoutingModule
  ],
  declarations: [FinalizarCompraPage]
})
export class FinalizarCompraPageModule {}
