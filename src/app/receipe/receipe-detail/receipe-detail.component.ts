import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { Receipes } from '../receipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  receipeDetail: Receipes;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit(): void {
   this.route.params.pipe(map(params => {
    return +params['id'];
   }), switchMap(id => {
    this.id = id;
    return this.store.select('recipes');
   }),
    map(recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      })
    }))
    .subscribe(recipe => {
      this.receipeDetail = recipe;
    });
  }

  onAddToShoppingList() {
    //this.receipeService.addIngredientsToShoppingList(this.receipeDetail.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.receipeDetail.ingredients));
  }

  onEditReceipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //A bit complex navigation method. Going up one level
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteReceipe() {
    //this.receipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
