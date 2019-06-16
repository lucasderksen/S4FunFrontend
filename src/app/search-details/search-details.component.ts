import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search/search.service';
import { ShowService } from '../services/show-service';
import { LoginService } from '../services/login-service';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
PNotify.defaults.icons = 'bootstrap3'; // glyphicons

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  
  id:any
  details: any
  type: any
  bool: boolean
  constructor( private activatedRoute: ActivatedRoute, private searchService : SearchService, private showService: ShowService, public loginService: LoginService) { }


  ngOnInit() {
    PNotifyButtons; // Initiate the module. Important!


    const params = this.activatedRoute.snapshot.params;
    console.log("paramsId", params.id);
    console.log("paramsmediatype", params.media);
    if(params.media == "tv"){
      console.log(this.searchService.getSerieDetailsById(params.id).subscribe((val) => {
        this.details = val;
        console.log("show " , val);
        this.details = val;
        console.log("details", this.details.name);
        this.type = "show";
        this.bool = true;
        }));


    } else if(params.media == "movie"){
      console.log(this.searchService.getMovieDetailsById(params.id).subscribe((val) => {
        this.details = val;
        console.log("show " , val);
        console.log("details.titel", this.details.title);
        console.log("details.titel");
        this.type = params.media;
        this.bool = false;

      }));
    }
  }

  AddToWatchList(){
    this.details
    console.log("add",this.details);
    this.showService.postShow(this.details,this.loginService.Currentid).subscribe((val) => {
      console.log(val);
    });   
    PNotify.success({
      title: 'Success!',
      text: 'You have added a '+this.type+"!, go to your overzicht to see it."
    });
    
  }

}
