import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss']
})
export class PublicFooterComponent implements OnInit {
  
  date = new Date();

  year: number = 2023;

  yearS: string = '';

  ngOnInit(): void {
    if(this.year == 2023){
      this.yearS = '2023';

    } else {
      this.yearS = 2023 + '-' +this.date.getFullYear();
    }
    
  }


}
