import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  // @Input() id !: string
    allRecipes:any=[]
  searchRecipe:string=""

  constructor(private api:ApiService){}
  ngOnInit(){
    this.viewRecipes()
  }

  viewRecipes(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      this.allRecipes = res 
      console.log(this.allRecipes);
      
    })
  }

  deleteRecipe(id:string){
    this.api.removeRecipeApi(id).subscribe((res)=>{
      alert("Deleted Successfully")
      this.viewRecipes()
    })
  }
}
