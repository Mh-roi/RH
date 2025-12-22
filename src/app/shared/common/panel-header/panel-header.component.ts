import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent implements OnInit {

  @Input() header!: string;

  @Input() icon!: string;

  constructor() { }

  ngOnInit() {
  }

}
