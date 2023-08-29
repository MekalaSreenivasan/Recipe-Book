import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrls: ['./receipe.component.css'],
})
export class ReceipeComponent implements OnInit{

  constructor(private dsService: DataStorageService) {

  }

  ngOnInit(): void {
    this.dsService.fetchRecipes();
  }
}
