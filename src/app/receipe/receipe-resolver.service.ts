import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Receipes } from "./receipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { ReceipeService } from "./receipe.service";

@Injectable({providedIn: 'root'})
export class ReceipeResolverService implements Resolve<Receipes[]>{
    constructor(private dsService: DataStorageService,
            private recipeService: ReceipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Receipes[] | Observable<Receipes[]> | Promise<Receipes[]> {
        const recipes = this.recipeService.getReceipes();
        if (recipes.length === 0) {
            return this.dsService.fetchRecipes();
        } else {
            return recipes;
        }
        
    }
}