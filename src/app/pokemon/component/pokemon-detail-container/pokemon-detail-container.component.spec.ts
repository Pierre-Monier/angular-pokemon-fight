import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailContainerComponent } from './pokemon-detail-container.component';

describe('HeroDetailComponent', () => {
  let component: PokemonDetailContainerComponent;
  let fixture: ComponentFixture<PokemonDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
