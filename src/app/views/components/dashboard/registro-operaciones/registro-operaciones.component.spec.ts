import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOperacionesComponent } from './registro-operaciones.component';

describe('RegistroOperacionesComponent', () => {
  let component: RegistroOperacionesComponent;
  let fixture: ComponentFixture<RegistroOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
