import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacaoPage } from './confirmacao.page';

describe('ConfirmacaoPage', () => {
  let component: ConfirmacaoPage;
  let fixture: ComponentFixture<ConfirmacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
