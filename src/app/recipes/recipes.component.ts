import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone:true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  p: number = 1;
  searchKey:String = ""
 allRecipes:any=[]
 cuisineArray:any=[]
 mealTypeArray:any = []
 dummyRecipe:any =[]
 
   constructor(private api:ApiService,private route:Router){ }
   ngOnInit(){
     this.getAllRecipes()
   }
   getAllRecipes(){
     this.api.getAllRecipesApi().subscribe((res:any)=>{
       this.allRecipes=res
       this.dummyRecipe = this.allRecipes
       console.log(this.allRecipes);
       this.allRecipes.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
       })
       console.log(this.cuisineArray);
       const dummyMeal = this.allRecipes.map((item:any)=>item.mealType)
      //  console.log(dummyMeal.flat(Infinity));
    const   flatDummyMeal = dummyMeal.flat(Infinity)
    flatDummyMeal.forEach((item:any)=>{
      !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
   
    })
       
      console.log(this.mealTypeArray);
      
       
     })
   }

   filterAllRecipes(key:any,value:String){
     this.allRecipes = this.dummyRecipe.filter((item:any)=>item[key].includes(value))
   }

   viewRecipe(recipeId:String){
    if(sessionStorage.getItem("token")){
       this.route.navigateByUrl(`/recipe/${recipeId}/view`)
    }else{
      alert("Please login for full Access")
    }
   }
}
