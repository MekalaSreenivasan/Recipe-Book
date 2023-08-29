import { Component, OnInit } from '@angular/core';
import { Receipes } from '../receipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  receipeDetail: Receipes;
  id: number;

  constructor(
    private receipeService: ReceipeService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
   this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.receipeDetail = this.receipeService.getReceipe(this.id);
   })
  }

  onAddToShoppingList() {
    this.receipeService.addIngredientsToShoppingList(this.receipeDetail.ingredients);
  }

  onEditReceipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //A bit complex navigation method. Going up one level
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteReceipe() {
    this.receipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
