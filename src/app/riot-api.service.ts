import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn';
  private version = '15.1.1'; 

  constructor(private http: HttpClient) { }

  getChampions() {
    let url = `${this.baseUrl}/${this.version}/data/de_DE/champion.json`;
    return this.http.get<any>(url)
  }
  getChampionImage(championId: string) {
    return `${this.baseUrl}/${this.version}/img/champion/champion0.png`;
  }

  getChampionDetails(championId: string) {
    const url = `${this.baseUrl}/${this.version}/data/de_DE/champion/${championId}.json`;
    return this.http.get<any>(url);
  }
  
  getChampionSpells(championId: string) {
    let url = `${this.baseUrl}/${this.version}/data/de_DE/champion/${championId}/spells`
    return this.http.get<any>(url)
  }

}
