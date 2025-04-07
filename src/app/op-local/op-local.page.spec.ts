import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpLocalPage } from './op-local.page';

describe('OpLocalPage', () => {
  let component: OpLocalPage;
  let fixture: ComponentFixture<OpLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
