import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailFormComponent } from './pokemon-detail-form.component';

describe('PokemonDetailFormComponent', () => {
  let component: PokemonDetailFormComponent;
  let fixture: ComponentFixture<PokemonDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
