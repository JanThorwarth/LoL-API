import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionCardDetailComponent } from './champion-card-detail.component';

describe('ChampionCardDetailComponent', () => {
  let component: ChampionCardDetailComponent;
  let fixture: ComponentFixture<ChampionCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionCardDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
