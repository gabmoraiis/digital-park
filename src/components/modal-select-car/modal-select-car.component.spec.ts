import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectCarComponent } from './modal-select-car.component';

describe('ModalSelectCarComponent', () => {
  let component: ModalSelectCarComponent;
  let fixture: ComponentFixture<ModalSelectCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
