import { Component, Input } from '@angular/core';
    import { ModalController } from '@ionic/angular';

    @Component({
      selector: 'app-confirm-modal',
      template: `
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="fecharModal(false)">Não</ion-button>
              <ion-button (click)="fecharModal(true)">Sim</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="ion-padding">{{ message }}</div>
        </ion-content>
      `,
    })
    export class ConfirmModalComponent {
      @Input() message: string;
      @Input() title: string;

      constructor(private modalController: ModalController) {
        this.message = '';
        this.title = '';
      }

      async fecharModal(resposta: boolean) {
        await this.modalController.dismiss(resposta);
      }
    }