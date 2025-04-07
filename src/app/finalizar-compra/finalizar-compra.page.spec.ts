import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarCompraPage } from './finalizar-compra.page';

describe('FinalizarCompraPage', () => {
  let component: FinalizarCompraPage;
  let fixture: ComponentFixture<FinalizarCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
