import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface Compra {
  compraId: number;
  userId: number;
  idItens: number[];
  desconto: number;
  total: number;
  nomeFaturacao: string;
  emailFaturacao: string;
  moradaFaturacao: string;
  ruaEntrega: string;
  cidadeEntrega: string;
  distritoEntrega: string;
  codigoPostalEntrega: string;
  metodoPagamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  public compras: Compra[] = [];

  constructor() { }

  getCompra(compraId: number): Observable<number[]> {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    return of(compra ? compra.idItens : []);
  }

  getTotal(compraId: number): number | null {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    return compra ? compra.total : null;
  }
  
  generateCompraId(): Observable<number> {
    const newCompraId = this.compras.length > 0 ? Math.max(...this.compras.map(compra => compra.compraId)) + 1 : 1;
    return of(newCompraId);
  }

  addCompra(
    compraId: number,
    userId: number,
    idItens: number[],
    desconto: number,
    total: number,
    nomeFaturacao: string,
    emailFaturacao: string,
    moradaFaturacao: string,
    ruaEntrega: string,
    cidadeEntrega: string,
    distritoEntrega: string,
    codigoPostalEntrega: string,
    metodoPagamento: string
  ): Observable<Compra> {
    const newCompra: Compra = {
      compraId,
      userId,
      idItens,
      desconto,
      total,
      nomeFaturacao,
      emailFaturacao,
      moradaFaturacao,
      ruaEntrega,
      cidadeEntrega,
      distritoEntrega,
      codigoPostalEntrega,
      metodoPagamento
    };
    this.compras.push(newCompra);
    return of(newCompra);
  }

  updateMoradaFaturacao(compraId: number, nomeFaturacao: string, emailFaturacao: string, moradaFaturacao: string): Observable<Compra> {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    if (compra) {
      compra.emailFaturacao = emailFaturacao;
      compra.nomeFaturacao = nomeFaturacao;
      compra.moradaFaturacao = moradaFaturacao;
      return of(compra);
    }
    return throwError('Compra não encontrada');
  }

  updateMoradaEntrega(compraId: number, ruaEntrega: string, cidadeEntrega: string, distritoEntrega: string, codigoPostalEntrega: string): Observable<Compra> {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    if (compra) {
      compra.ruaEntrega = ruaEntrega;
      compra.cidadeEntrega = cidadeEntrega;
      compra.distritoEntrega = distritoEntrega;
      compra.codigoPostalEntrega = codigoPostalEntrega;
      return of(compra);
    }
    return throwError('Compra não encontrada');
  }

  updateMetodoPagamento(compraId: number, novoMetodoPagamento: string): Observable<Compra> {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    if (compra) {
      compra.metodoPagamento = novoMetodoPagamento;
      return of(compra);
    }
    return throwError('Compra não encontrada');
  }

  updateValorDesconto(compraId: number, percentDesconto: number): Observable<Compra> {
    const compra = this.compras.find(compra => compra.compraId === compraId);
    if (compra) {
      compra.desconto = percentDesconto;
      compra.total = compra.total * (1 - percentDesconto / 100);
      return of(compra);
    }
    return throwError('Compra não encontrada');
  }
  confirmarCompra(compra: Compra): Observable<Compra> {
    this.compras.push(compra);
    return of(compra);
  }
}
