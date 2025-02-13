import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RiotApiService } from '../riot-api.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  value = '';
  searchChamp: string = "";

  constructor(private riotApiService: RiotApiService) {}



  filterChampions(query: string) {
    this.riotApiService.filteredChampions = this.riotApiService.allChampions.filter((champion: any) =>
      champion.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }
  
}
