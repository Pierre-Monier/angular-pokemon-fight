import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSelectorComponent } from './stat-selector.component';

describe('StatSelectorComponent', () => {
  let component: StatSelectorComponent;
  let fixture: ComponentFixture<StatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
