import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserConfigComponent } from './modal-user-config.component';

describe('ModalUserConfigComponent', () => {
  let component: ModalUserConfigComponent;
  let fixture: ComponentFixture<ModalUserConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUserConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUserConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
