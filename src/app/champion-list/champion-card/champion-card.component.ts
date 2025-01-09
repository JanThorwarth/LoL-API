import { Component, Input } from '@angular/core';
import { RiotApiService } from '../../riot-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-champion-card',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './champion-card.component.html',
  styleUrl: './champion-card.component.scss'
})
export class ChampionCardComponent {
  @Input() champion!: any;
  

  constructor(public riotApi: RiotApiService) {}


  
}