import { Component, OnDestroy, OnInit } from '@angular/core';
import { Receipes } from '../receipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit, OnDestroy{
  receipes: Receipes[];
  sub: Subscription;

  constructor(
      private receipeService: ReceipeService,
      private router: Router,
      private route: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
    this.sub = this.receipeService.recipesChanged.subscribe((recipes: Receipes[]) => {
      this.receipes = recipes;
    })
    this.receipes = this.receipeService.getReceipes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addNewReceipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

