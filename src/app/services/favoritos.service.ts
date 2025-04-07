import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CarrinhoService } from '../services/carrinho.service'; // Importe o serviço de carrinho
import { ActivatedRoute } from '@angular/router';


export interface listaFavoritos {
  userId: number;
  idItens: number[];
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private listasFavoritos: listaFavoritos[] = [];

  constructor(
    
  ) {
  
  }

  getFavoritos(userId: number): Observable<number[]> {
    const lista = this.listasFavoritos.find(lista => lista.userId === userId);
    return of(lista ? lista.idItens : []);
  }

  adicionarItemFavoritos(userId: number, itemId: number): Observable<void> {
    let lista = this.listasFavoritos.find(lista => lista.userId === userId);
    if (!lista) {
      lista = { userId, idItens: []};
      this.listasFavoritos.push(lista);
    }
    lista.idItens.push(itemId);
    return of(undefined);
  }
  removerItemFavoritos(userId: number, itemId: number): Observable<void> {
    const lista = this.listasFavoritos.find(lista => lista.userId === userId);
    if (lista) {
      const index = lista.idItens.indexOf(itemId);
      if (index !== -1) {
        lista.idItens.splice(index, 1); // Remove o item do carrinho
        // Como não atualizamos o total automaticamente ao remover um item, você pode optar por atualizar aqui se necessário
        return of(undefined);
      }
    }
    return of(undefined); // Retorna uma observable vazio se o item não for encontrado ou o carrinho não existir
  }

 
}
