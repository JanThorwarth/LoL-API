import { Component } from '@angular/core';
import { ChampionCardComponent } from "./champion-card/champion-card.component";
import { CommonModule } from '@angular/common';
import { RiotApiService } from '../riot-api.service';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [ChampionCardComponent, CommonModule],
  templateUrl: './champion-list.component.html',
  styleUrl: './champion-list.component.scss'
})
export class ChampionListComponent {

  champions: any[] = []

  constructor(public riotApi: RiotApiService) {}


  ngOnInit() {
    this.riotApi.getChampions().subscribe((data) => {
      this.champions = Object.values(data.data).slice(0, 50)
      console.log(this.champions);
      

    })
  
  
}

}
