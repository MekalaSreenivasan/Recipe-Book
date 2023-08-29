import { Injectable } from '@angular/core';
import { Receipes } from '../receipe/receipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class ReceipeService {
  recipesChanged = new Subject<Receipes[]>();

    constructor(private shoppingListService: ShoppingListService) {
    }

    /*private receipes: Receipes[] = [
        new Receipes(
        'Tasty Schnitzel', 
        'A Super-tasty Schnitzel - just awesome!', 
        'https://media.istockphoto.com/id/603258520/photo/schnitzel-and-fried-potatoes.jpg?s=612x612&w=0&k=20&c=RXAndwtpKN2XUvV_TCkCQCfdlQ6sjJXTOiNpq7Kphs0=',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Receipes('Big Fat Burger', 
        'Tasty Burger', 
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1),
            new Ingredient('Cheese', 2)
        ])
      ];*/
      private receipes: Receipes[] = [];
    
      setReceipes(recipes: Receipes[]) {
        this.receipes = recipes;
        this.recipesChanged.next(this.receipes.slice());
      }

      getReceipes() {
        //A copy is passed as slice() is added
         //Add logic to remove duplicate and club it together by updating amount
        return this.receipes.slice();
      }

      getReceipe(index: number) {
        return this.receipes[index];
      } 

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //Add logic to remove duplicate and club it together by updating amount
        this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Receipes) {
        this.receipes.push(recipe);
        this.recipesChanged.next(this.receipes.slice());
      }

      updateRecipe(index: number, newRecipe: Receipes) {
        this.receipes[index] = newRecipe;
        this.recipesChanged.next(this.receipes.slice());
      }

      deleteRecipe(index: number) {
        this.receipes.splice(index, 1);
        this.recipesChanged.next(this.receipes.slice());
      }
}