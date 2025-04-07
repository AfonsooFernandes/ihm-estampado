import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface Produto {
  id: number;
  titulo: string;
  tipo: string;
  descricao: string;
  preco: number;
  imagem: string;
  tamanhoSelecionado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private produtos: Produto[] = [
    {
      titulo: 'T-Shirt branca manga curta personalizável', tipo: 'Vestuário', imagem: "assets/imagens/tshirt branca.png", preco: 10.99,  tamanhoSelecionado: "-",
      id: 1,
      descricao: ''
    },
    { titulo: 'Chapéu branco/cinzento personalizável', tipo: 'Acessórios', imagem : "assets/imagens/chapeu.png", preco : 10.99, tamanhoSelecionado: '',
      id:2,
      descricao: ''
    },
    { titulo: 'Capa de telemóvel Samsung S8 personalizavél', tipo: 'Objetos / Decoração', imagem : "assets/imagens/capa-telemovel.png", preco : 10.99, tamanhoSelecionado: '',
      id:3,
      descricao: ''
     },
     { titulo: 'Capa de Almofada personalizavél', tipo: 'Objetos / Decoração', imagem : "assets/imagens/almofada.png", preco : 10.99, tamanhoSelecionado: '',
      id:4,
      descricao: ''
     },
     { titulo: 'Caneca personalizavél', tipo: 'Objetos / Decoração', imagem : "assets/imagens/caneca.png", preco : 10.99, tamanhoSelecionado: '',
      id:5,
      descricao: ''
     },
     { titulo: 'Íman personalizavél', tipo: 'Objetos / Decoração', imagem : "assets/imagens/iman.png", preco : 10.99, tamanhoSelecionado: '',
      id:6,
      descricao: ''
     },
     { titulo: 'Caderno personalizavél', tipo: 'Objetos / Decoração', imagem : "assets/imagens/caderno.png", preco : 10.99, tamanhoSelecionado: '',
      id:7,
      descricao: ''
     }
  ];

  constructor() { }

  getProdutos(): Observable<Produto[]> {
    return of(this.produtos);
  }

  getProdutoById(id: number): Observable<Produto | null> {
    return of(this.produtos.find(produto => produto.id === id) || null).pipe(
      catchError(() => of(null))
    );
  }
}
