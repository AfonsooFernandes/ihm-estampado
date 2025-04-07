import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoPagamentoPage } from './metodo-pagamento.page';

describe('MetodoPagamentoPage', () => {
  let component: MetodoPagamentoPage;
  let fixture: ComponentFixture<MetodoPagamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoPagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
