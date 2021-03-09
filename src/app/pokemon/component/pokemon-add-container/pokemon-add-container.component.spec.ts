import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAddContainerComponent } from './pokemon-add-container.component';

describe('PokemonAddContainerComponent', () => {
  let component: PokemonAddContainerComponent;
  let fixture: ComponentFixture<PokemonAddContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonAddContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
