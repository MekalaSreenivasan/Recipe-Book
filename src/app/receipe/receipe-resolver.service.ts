import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../receipe/store/recipe.actions';
import { Receipes } from "./receipe.model";

@Injectable({providedIn: 'root'})
export class ReceipeResolverService implements Resolve<Receipes[]>{
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Receipes[] | Observable<Receipes[]> | Promise<Receipes[]> {
        //return this.dsService.fetchRecipes();
        return this.store.select('recipes').pipe(
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