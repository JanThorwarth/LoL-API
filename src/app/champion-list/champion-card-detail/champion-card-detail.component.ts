import { Component, Inject, inject, Input } from '@angular/core';
import { RiotApiService } from '../../riot-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, FormStyle } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-champion-card-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './champion-card-detail.component.html',
  styleUrl: './champion-card-detail.component.scss'
})
export class ChampionCardDetailComponent {
   champion: any;
   activeSection: string | null = null;
   

    constructor(public riotApi: RiotApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChampionCardDetailComponent> ) { 
      this.champion = data.champion
    }

    ngOnInit() {
      this.riotApi.getChampionDetails(this.data.championId).subscribe((champ) => {
        this.champion = champ.data[this.data.championId];
        console.log(this.champion);
       
        

        

      })
    }

    closeDialog() {
      this.dialogRef.close();
    }

    showSection(section: string | null) {
      this.activeSection = section

    }
   



}
