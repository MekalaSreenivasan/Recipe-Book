import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
//import { LoggingService } from "../logging.service";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ShoppingListComponent
            },            
        ]),
        FormsModule,
        SharedModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    //providers: [LoggingService] Creates it own instance again. Even if instance is created in App Module
})
export class ShoppingListModule {

}