import { Component, OnInit } from '@angular/core';

// Servicios
import { MovieService } from '../../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  // Declaraciones
  public searchData = null;
  public subscriptionSearchData: Subscription;

  constructor(
    private movieService : MovieService
  ) { 
      this.subscriptionSearchData = this.movieService.observableSearchData$
        .subscribe(
          dataSearch => {
            this.searchData = dataSearch;
          });
  }

  ngOnInit() {
  }

  public getMoviesSearch() {
    if (this.searchData) {
      this.movieService.nextData(this.searchData);
    }
  }

}
