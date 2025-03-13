import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { PnfComponent } from './pnf/pnf.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DownloadListComponent } from './admin/download-list/download-list.component';
import { RequestListComponent } from './admin/request-list/request-list.component';
import { RecipeListComponent } from './admin/recipe-list/recipe-list.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
    // lazy loaded admin module
    {
        path:"admin", canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },



    // user
    {
        path:"",component:HomeComponent,title:"home"
    },
    {
        path:"about",component:AboutComponent,title:"about"
    },
    {
        path:"contact",component:ContactComponent,title:"contact"
    },
    {
        path:"login",component:LoginComponent,title:"login"
    },
    {
        path:"register",component:RegisterComponent,title:"register"
    },
    {
        path:"all-recipes",component:RecipesComponent,title:"all-recipes"
    },
    {
        path:"saved-recipes", canActivate:[authGuard],component:SavedRecipesComponent,title:"saved recipes collection"
    },
    {
        path:"recipe/:id/view", canActivate:[authGuard],component:ViewRecipesComponent,title:"View recipes"
    },
    {
        path:"profile", canActivate:[authGuard],component:ProfileComponent,title:"profile"
    },
    {
        path:"**",component:PnfComponent,title:"page not found"
    },
    
    // {
    //     path:"",component:HomeComponent,title:"home"
    // },
];
