import { Component, Input, OnInit } from '@angular/core';
import { Receipes } from '../../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit{
 @Input() receipeItem : Receipes;
 @Input() index: number;

  constructor() {

  }

  ngOnInit(): void {
    
  }
}
