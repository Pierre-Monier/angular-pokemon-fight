import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveListContainerComponent } from './move-list-container.component';

describe('MoveListContainerComponent', () => {
  let component: MoveListContainerComponent;
  let fixture: ComponentFixture<MoveListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
