// src/app/services/carrinho.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Carrinho {
  userId: number;
  idItens: number[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinhos: Carrinho[] = [];

  constructor() { }

  getCarrinho(userId: number): Observable<number[]> {
    const carrinho = this.carrinhos.find(carrinho => carrinho.userId === userId);
    return of(carrinho ? carrinho.idItens : []);
  }

  adicionarItemCarrinho(userId: number, itemId: number, preco: number): Observable<void> {
    let carrinho = this.carrinhos.find(carrinho => carrinho.userId === userId);
    if (!carrinho) {
      carrinho = { userId, idItens: [], total: 0 };
      this.carrinhos.push(carrinho);
    }
    carrinho.idItens.push(itemId);
    carrinho.total += preco;
    return of(undefined);
  }

  removerItemCarrinho(userId: number, itemId: number): Observable<void> {
    const carrinho = this.carrinhos.find(carrinho => carrinho.userId === userId);
    if (carrinho) {
      const index = carrinho.idItens.indexOf(itemId);
      if (index !== -1) {
        carrinho.idItens.splice(index, 1); // Remove o item do carrinho
      }
    }
    return of(undefined); // Retorna uma observable vazio se o item não for encontrado ou o carrinho não existir
  }

  obterTotal(userId: number): Observable<number> {
    const carrinho = this.carrinhos.find(carrinho => carrinho.userId === userId);
    return of(carrinho ? carrinho.total : 0);
  }

  limparCarrinho(userId: number): Observable<void> {
    const carrinhoIndex = this.carrinhos.findIndex(carrinho => carrinho.userId === userId);
    if (carrinhoIndex !== -1) {
      this.carrinhos.splice(carrinhoIndex, 1);
    }
    return of(undefined);
  }
}
