import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutosService, Produto } from '../services/produtos.service';
import { AlertController } from '@ionic/angular';
import { FavoritosService } from '../services/favoritos.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.page.html',
  styleUrls: ['./produto-detalhes.page.scss'],
})
export class ProdutoDetalhesPage implements OnInit {
  produto: Produto | null = null;
  userId: number = 1;
  textoInserido: string = '';
  fotoInserida: string = '';
  showSelectImage: boolean = false;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private navCtrl: NavController,
    private carrinhoService: CarrinhoService,
    private alertController: AlertController,
    private favoritosService: FavoritosService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.produtosService.getProdutoById(productId).subscribe((produto: Produto | null) => {
      this.produto = produto;
    });
  }

  voltar() {
    this.navCtrl.back();
  }

  async inserirFoto() {
    this.showSelectImage = true;

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image);

    if (image) {
      this.saveImage(image);
      this.fotoInserida = image.webPath || '';
    }
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image);

    if (image) {
      this.saveImage(image);
      this.fotoInserida = image.webPath || '';
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    });
    console.log('saved: ', savedFile);
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });

  async inserirTexto() {
    const alert = await this.alertController.create({
      header: 'Inserir Texto',
      inputs: [
        {
          name: 'texto',
          type: 'text',
          placeholder: 'Digite o texto aqui'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.textoInserido = data.texto;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast'
    });
    await toast.present();
}


  adicionarAoCarrinho(itemId: number, preco: number) {
    this.carrinhoService.adicionarItemCarrinho(this.userId, itemId, preco).subscribe(() => {
      this.presentToast('Item adicionado ao carrinho com sucesso.');
    }, error => {
      this.presentToast('Erro ao adicionar item ao carrinho.');
      console.error('Erro ao adicionar item ao carrinho:', error);
    });
  }

  adicionarAosFavoritos(itemId: number) {
    this.favoritosService.adicionarItemFavoritos(this.userId, itemId).subscribe(() => {
      this.presentToast('Item adicionado aos Favoritos com sucesso.');
    }, error => {
      this.presentToast('Erro ao adicionar item aos Favoritos.');
      console.error('Erro ao adicionar item aos Favoritos:', error);
    });
  }
}
