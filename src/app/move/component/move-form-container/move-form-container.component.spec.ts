import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFormContainerComponent } from './move-form-container.component';

describe('MoveFormContainerComponent', () => {
  let component: MoveFormContainerComponent;
  let fixture: ComponentFixture<MoveFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
