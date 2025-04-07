import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpLocalPageRoutingModule } from './op-local-routing.module';

import { OpLocalPage } from './op-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpLocalPageRoutingModule
  ],
  declarations: [OpLocalPage]
})
export class OpLocalPageModule {}
