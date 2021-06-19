import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCurrencyOptionsComponent } from './select-currency-options.component';

describe('SelectCurrencyOptionsComponent', () => {
  let component: SelectCurrencyOptionsComponent;
  let fixture: ComponentFixture<SelectCurrencyOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCurrencyOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCurrencyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
