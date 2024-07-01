import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresComponent } from './suppliers/suppliers.component';
import { FornecedoresListComponent } from './suppliers/suppliers-list/suppliers-list.component';

export const routes: Routes = [

    {
        path: "categories",
        component: CategoriesComponent
    },
    {
        path: "suppliers",
        component: FornecedoresComponent,
        children: [
            {
                path: '',
                component: FornecedoresListComponent
            }
        ]
    },
    {
        path: "",
        component: DashboardComponent
    },
];
