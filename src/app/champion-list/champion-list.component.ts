import { Component, inject } from '@angular/core';
import { ChampionCardComponent } from "./champion-card/champion-card.component";
import { CommonModule } from '@angular/common';
import { RiotApiService } from '../riot-api.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { ChampionCardDetailComponent } from './champion-card-detail/champion-card-detail.component';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [ChampionCardComponent, CommonModule],
  templateUrl: './champion-list.component.html',
  styleUrl: './champion-list.component.scss'
})
export class ChampionListComponent {
  readonly dialog = inject(MatDialog);
  allChampions = [];
  filteredChampions = [];
  champions: any[] = []
  loadedChampions: number = 30;

  constructor(public riotApi: RiotApiService) { }


  ngOnInit() {
    this.riotApi.getChampions().subscribe(() => {
      this.allChampions = this.riotApi.allChampions
      this.filteredChampions = this.riotApi.filteredChampions;
      this.filteredChampions = this.filteredChampions.slice(0, this.loadedChampions)
    })
  }

  moreChampions() {
    this.loadedChampions += 30;
    this.filteredChampions = this.allChampions.slice(0, this.loadedChampions); 
  }
  

  openDialog(champion: any) {
    this.dialog.open(ChampionCardDetailComponent, {
      backdropClass: "background",
      data: { championId: champion.id },
    });
  }
}


