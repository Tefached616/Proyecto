import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoxMateriaPrimaComponent } from './productox-materia-prima.component';

describe('ProductoxMateriaPrimaComponent', () => {
  let component: ProductoxMateriaPrimaComponent;
  let fixture: ComponentFixture<ProductoxMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoxMateriaPrimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoxMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
