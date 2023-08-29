import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    editingItem = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10 )
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredeient: Ingredient) {
        this.ingredients.push(ingredeient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    addIngredients(ingredeients: Ingredient[]) {
        /*for (let ingredeient of ingredeients) {
            this.addIngredient(ingredeient);
        }*/
        this.ingredients.push(...ingredeients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}