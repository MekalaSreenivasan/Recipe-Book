import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../receipe/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrls: ['./receipe.component.css'],
})
export class ReceipeComponent implements OnInit{

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {

  }

  ngOnInit(): void {
    this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
    }),
    switchMap(recipes => {
        if (recipes.length === 0) {
            this.store.dispatch(new RecipesAction.FetchRecipes());
            return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES),
            take(1));
        } else {
            return of(recipes);
        }
    }))
  }
}
