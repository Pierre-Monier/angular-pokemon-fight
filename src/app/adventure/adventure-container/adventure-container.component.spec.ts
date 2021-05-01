import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdventureContainerComponent} from './adventure-container.component';

describe('AdventureContainerComponent', () => {
  let component: AdventureContainerComponent;
  let fixture: ComponentFixture<AdventureContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventureContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
