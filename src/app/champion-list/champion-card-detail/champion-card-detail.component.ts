import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Inject, inject, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RiotApiService } from '../../riot-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, FormStyle } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Chart, DoughnutController, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PieController } from 'chart.js';




@Component({
  selector: 'app-champion-card-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './champion-card-detail.component.html',
  styleUrl: './champion-card-detail.component.scss'
})
export class ChampionCardDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  champion: any;
  championSkins: any[] = []
  activeSection: string | null = null;
  imageIndex: number = 1;
  showP: boolean = false;
  showQ: boolean = false;
  showW: boolean = false;
  showE: boolean = false;
  showR: boolean = false;
  chartInitialized = false;
  chart: Chart | null = null;


  constructor(public riotApi: RiotApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChampionCardDetailComponent>, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
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
      this.championSkins = champ.data[this.data.championId].skins;

      console.log(this.champion);

      this.champPassive = this.sanitizer.bypassSecurityTrustHtml(this.champion.passive.description)
      this.champQ = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[0].description)
      this.champW = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[1].description)
      this.champE = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[2].description)
      this.champR = this.sanitizer.bypassSecurityTrustHtml(this.champion.spells[3].description)
    })

  }

  ngAfterViewInit() {
    if (this.activeSection === 'stats') {
      this.createChart();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }


  createChart() {
    if (!this.chartCanvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    Chart.register(
      PieController,
      DoughnutController,
      ArcElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['armor', 'mp', 'ad', 'attackrange', 'hp', 'movespeed', 'mr'],
        datasets: [
          {
            label: '',
            data: [
              this.champion.stats.armor,
              this.champion.stats.mp,
              this.champion.stats.attackdamage,
              this.champion.stats.attackrange,
              this.champion.stats.hp,
              this.champion.stats.movespeed,
              this.champion.stats.spellblock,
            ],
            borderWidth: 1,
            backgroundColor: ['red', 'blue', 'yellow', 'purple', 'green', 'orange', 'lightblue'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    });
  }


  closeDialog() {
    this.dialogRef.close();
  }

  showSection(section: string | null) {
    this.activeSection = section
    this.cdr.detectChanges();
    if (this.activeSection === 'stats') {
      setTimeout(() => {
        this.createChart();
      }, 0);
    } else {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
    this.showQ = false
    this.showW = false
    this.showE = false
    this.showR = false
    this.showP = false
    this.imageIndex = 0;

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

  lastImg() {
    if (this.imageIndex > 0) {
      this.imageIndex--
    }
    else {
      this.imageIndex = this.championSkins.length - 1
    }


  }
  nextImg() {
    if (this.imageIndex < this.championSkins.length - 1) {
      this.imageIndex++
    } else {
      this.imageIndex = 0
    }
  }
}

