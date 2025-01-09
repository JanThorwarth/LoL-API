import { Component } from '@angular/core';
import { ChampionCardComponent } from "./champion-card/champion-card.component";

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [ChampionCardComponent],
  templateUrl: './champion-list.component.html',
  styleUrl: './champion-list.component.scss'
})
export class ChampionListComponent {

}
