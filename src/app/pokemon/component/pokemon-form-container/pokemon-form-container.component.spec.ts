import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormContainerComponent } from './pokemon-form-container.component';

describe('HeroDetailComponent', () => {
  let component: PokemonFormContainerComponent;
  let fixture: ComponentFixture<PokemonFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonFormContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
