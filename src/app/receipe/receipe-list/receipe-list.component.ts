import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { Receipes } from '../receipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit, OnDestroy{
  receipes: Receipes[];
  sub: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private store: Store<fromApp.AppState>
    ) {

  }

  ngOnInit(): void {
    this.sub = this.store.select('recipes')
    .pipe(map(recipesState =>  recipesState.recipes))
    .subscribe((recipes: Receipes[]) => {
      this.receipes = recipes;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addNewReceipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

