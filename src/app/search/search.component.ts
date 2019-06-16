import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { ActivatedRoute } from '@angular/router';
import { Serie } from '../models/serie';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  series = [];
  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(val => {
      const params = this.activatedRoute.snapshot.params;
      if (params.title) {
          console.log(params.title);
          console.log(this.searchService.getSeriesByName(params.title));
          this.searchService.getSeriesByName(params.title).subscribe((data: Serie[]) => {this.series = data;
          console.log("array van series:", this.series);
          });
        
          console.log("array", this.series);
    
    }});
   }

  ngOnInit() {
    // const params = this.activatedRoute.snapshot.params;
    // if (params.title) {
    //   console.log(params.title);
    //   console.log(this.searchService.getSeriesByName(params.title));
    //   this.searchService.getSeriesByName(params.title).subscribe((data: Serie[]) => {this.series = data;
    //   console.log("array van series:", this.series);
    //   });
    
    //   console.log("array", this.series);

    // }
    
  }

}

