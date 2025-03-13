import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  allSavedRecipes:any = []

  constructor(private api:ApiService){}
   ngOnInit(){
    this.getallSavedRecipes()
   }
  getallSavedRecipes(){
    this.api.showSavedRecipeApi().subscribe((res:any)=>{
      this.allSavedRecipes = res
      console.log(this.allSavedRecipes);
      
    })
  }

  deleteSavedRecipe(id:String){
    this.api.delteSavedRecipeApi(id).subscribe((res:any)=>{
      this.getallSavedRecipes()

      }
    )
  }
}
