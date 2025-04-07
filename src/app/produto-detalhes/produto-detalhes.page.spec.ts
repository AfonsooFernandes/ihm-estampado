import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoDetalhesPage } from './produto-detalhes.page';

describe('ProdutoDetalhesPage', () => {
  let component: ProdutoDetalhesPage;
  let fixture: ComponentFixture<ProdutoDetalhesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
