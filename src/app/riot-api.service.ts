import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn';
  private version = '15.1.1'; 
  allChampions: any =[];
  filteredChampions: any = [];

  constructor(private http: HttpClient) { }

  getChampions() {
    const url = `${this.baseUrl}/${this.version}/data/de_DE/champion.json`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.allChampions = Object.values(response.data); 
        this.filteredChampions = [...this.allChampions]; 
      })
    );
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
