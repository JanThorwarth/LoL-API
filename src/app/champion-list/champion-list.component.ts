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
} from '@angular/material/dialog';
import { ChampionCardDetailComponent } from './champion-card-detail/champion-card-detail.component';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [ChampionCardComponent, CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './champion-list.component.html',
  styleUrl: './champion-list.component.scss'
})
export class ChampionListComponent {
  readonly dialog = inject(MatDialog);

  champions: any[] = []

  constructor(public riotApi: RiotApiService) { }


  ngOnInit() {
    this.riotApi.getChampions().subscribe((data) => {
      this.champions = Object.values(data.data).slice(0, 50)
      console.log(this.champions);


    })


  }


  openDialog(champion: any) {
    this.dialog.open(ChampionCardDetailComponent, {
      backdropClass: "background",
      data: {champion},
     
    });
  }

}
