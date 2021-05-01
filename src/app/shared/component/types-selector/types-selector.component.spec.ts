import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TypesSelectorComponent} from './types-selector.component';

describe('TypesSelectorComponent', () => {
  let component: TypesSelectorComponent;
  let fixture: ComponentFixture<TypesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypesSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
