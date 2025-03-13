import { NgModule } from '@angular/core';
import { RouterEvent, RouterLink, RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  
      // admin dashboard
      {
          path:"",component:DashboardComponent,canActivate:[authGuard],title:"Admin Dashboard"
      },
      // admin dowload list
      {
          path:"download-list",component:DownloadListComponent,title:"Download list"
      },
      // admin request list
      {
          path:"request-list",component:RequestListComponent,title:"Request list"
      },
      // admin recipe-list
      {
          path:"recipe-list",component:RecipeListComponent,title:"Recipe list"
      },
      {
          path:"user-list",component:UserListComponent,title:"User list"
      },
      {
          path:"recipe/:id/edit",component:ManageRecipeComponent,title:"User list"
      },
      {
          path:"recipe/add",component:ManageRecipeComponent,title:"Add Recipe page"
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RouterLink]
})
export class AdminRoutingModule { }
