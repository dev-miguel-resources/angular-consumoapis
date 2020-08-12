import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

// Services and subscriptions
import { MovieService } from '../../services/movie.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [

  ]

})
export class HomeComponent implements OnInit, OnDestroy {

  // Declarations
  public viewCount = 9;
  public page = 0;
  public pageSize = 9;
  public previousPage = 0;
  public movies = [];
  public moviesStorage = [];
  public objectMovie: any;
  public subscriptionSearchData: Subscription;
  private componentDestroyed: Subject<boolean> = new Subject();
  public message = null;

  constructor(
    private movieService: MovieService,
    private router: ActivatedRoute
  ) {
      this.subscriptionSearchData = this.movieService.observableSearchData$
        .subscribe(
          dataSearch => {
            if(dataSearch) {
              this.getDataSearch(dataSearch);
            }
          });
   }

  ngOnInit() {
    this.router.params.subscribe(routeParams => {
      this.getPopular(routeParams.category);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
    this.subscriptionSearchData.unsubscribe();
  }

  public changeViewMovie() {
    this.movies = [];
    this.movies = this.moviesStorage.slice(0, this.viewCount);
  }

  public getPopular(category: string) {
    
  }

}
