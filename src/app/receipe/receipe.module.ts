import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { ReceipeDetailComponent } from "./receipe-detail/receipe-detail.component";
import { ReceipeEditComponent } from "./receipe-edit/receipe-edit.component";
import { ReceipeItemComponent } from "./receipe-list/receipe-item/receipe-item.component";
import { ReceipeListComponent } from "./receipe-list/receipe-list.component";
import { ReceipeStartComponent } from "./receipe-start/receipe-start.component";
import { ReceipeComponent } from "./receipe.component";
import { ReceipeRoutingModule } from "./receipe-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ReceipeComponent,
        ReceipeListComponent,
        ReceipeDetailComponent,
        ReceipeItemComponent,
        ReceipeStartComponent,
        ReceipeEditComponent,              
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        ReceipeRoutingModule,
        SharedModule
    ],
    exports: [
        ReceipeComponent,
        ReceipeListComponent,
        ReceipeDetailComponent,
        ReceipeItemComponent,
        ReceipeStartComponent,
        ReceipeEditComponent,
    ]
})
export class ReceipeModule {}