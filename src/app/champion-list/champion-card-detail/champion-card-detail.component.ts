import { Component, Inject, inject, Input } from '@angular/core';
import { RiotApiService } from '../../riot-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, FormStyle } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  showP: boolean = false;
  showQ: boolean = false;
  showW: boolean = false;
  showE: boolean = false;
  showR: boolean = false;


  constructor(public riotApi: RiotApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChampionCardDetailComponent>,private sanitizer: DomSanitizer) {
    this.champion = data.champion
  }
  champPassive!: SafeHtml
  champQ!: SafeHtml
  champW!: SafeHtml
  champE!: SafeHtml
  champR!: SafeHtml

  ngOnInit() {
    this.riotApi.getChampionDetails(this.data.championId).subscribe((champ) => {
      this.champion = champ.data[this.data.championId];
      console.log(this.champion);

      this.champPassive = this.sanitizer.bypassSecurityTrustHtml(this.champion.passive.description)
      this.champQ = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[0].description)
      this.champW = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[1].description)
      this.champE = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[2].description)
      this.champR = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[3].description)
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSection(section: string | null) {
    this.activeSection = section
    this.showQ = false
    this.showW = false
    this.showE = false
    this.showR = false
    this.showP = false

  }



  showPassive() {
    this.showP = true
    this.showQ = false
    this.showW = false
    this.showE = false
    this.showR = false
  }
  showQAbilty() {
    this.showQ = true
    this.showW = false
    this.showE = false
    this.showR = false
    this.showP = false
  }
  showWAbilty() {
    this.showW = true
    this.showE = false
    this.showR = false
    this.showP = false
    this.showQ = false
  }
  showEAbilty() {
    this.showE = true
    this.showR = false
    this.showP = false
    this.showQ = false
    this.showW = false
  }
  showRAbilty() {
    this.showR = true
    this.showP = false
    this.showQ = false
    this.showW = false
    this.showE = false
  }
 
}
