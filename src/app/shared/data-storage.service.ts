import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ReceipeService } from "../receipe/receipe.service";
import { Receipes } from "../receipe/receipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: ReceipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getReceipes();
        this.http.put(
            'https://receipe-book-62566-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe((response) => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.http.get<Receipes[]>(
                'https://receipe-book-62566-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return  {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    })
                }), tap(recipes => {
                    this.recipeService.setReceipes(recipes);
                })
            )
    }
}