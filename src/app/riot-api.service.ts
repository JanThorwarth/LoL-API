import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn';
  private version = '15.1.1'; // Aktuelle LoL-Version

  constructor(private http: HttpClient) { }

  getChampions() {
    let url = `${this.baseUrl}/${this.version}/data/de_DE/champion.json`;
    return this.http.get<any>(url)
  }
  getChampionImage(championId: string) {
    return `${this.baseUrl}/${this.version}/img/champion/champion0.png`;
  }
}
