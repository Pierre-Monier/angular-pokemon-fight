import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEditContainerComponent } from './pokemon-edit-container.component';

describe('HeroDetailComponent', () => {
  let component: PokemonEditContainerComponent;
  let fixture: ComponentFixture<PokemonEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonEditContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
