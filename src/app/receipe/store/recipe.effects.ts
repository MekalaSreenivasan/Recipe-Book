import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as RecipeActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Receipes } from "../receipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../../store/app.reducer';


@Injectable()
export class RecipeEffects {

    fetchRecipes = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Receipes[]>(
                  'https://angular-test-fd57f-default-rtdb.firebaseio.com/recipes.json'
                );
              }),
              map((recipes) => {
                return recipes.map((recipe) => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : [],
                  };
                });
              }),
              map((recipes) => {
                return new RecipeActions.SetRecipes(recipes);
              })
        )
    )

    storeRecipes = createEffect(() => 
        this.actions$.pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipeState]) => {
                return this.http.put(
                    'https://receipe-book-62566-default-rtdb.firebaseio.com/recipes.json',
                    recipeState.recipes
                )
            })
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}