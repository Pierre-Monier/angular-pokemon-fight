import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameUserPokemonSelectorComponent} from './game-user-pokemon-selector.component';

describe('GameUserPokemonSelectorComponent', () => {
  let component: GameUserPokemonSelectorComponent;
  let fixture: ComponentFixture<GameUserPokemonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameUserPokemonSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameUserPokemonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
