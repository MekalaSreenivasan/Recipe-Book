export class Ingredient {
    public name: string;
    public amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
/**
 * Another way to define above constructor
 * export class Ingredient {
 *  constructor(public name:string, public amount: number) {}
 * }
 */