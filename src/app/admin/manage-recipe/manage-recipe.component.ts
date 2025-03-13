import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
   @Input() id !: string
   cuisineArray:any=[]
   mealTypeArray:any = []
   recipeDetails:RecipeModel={}
   ingredientArray:any=[]
   instructionArray:any=[]
   mealArray:any=[]
  
   
     constructor(private api:ApiService,private router:Router){ }
     ngOnInit(){
       this.getAllRecipes()
     }
     getAllRecipes(){
       this.api.getAllRecipesApi().subscribe((res:any)=>{
        
        if(this.id){
          this.recipeDetails = res.find((item:any)=>item._id == this.id)
          this.ingredientArray = this.recipeDetails.ingredients
          this.instructionArray = this.recipeDetails.instructions
          this.mealArray = this.recipeDetails.mealType
        }

         res.forEach((item:any)=>{
          !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
         })
         console.log(this.cuisineArray);
         const dummyMeal = res.map((item:any)=>item.mealType)
        //  console.log(dummyMeal.flat(Infinity));
      const   flatDummyMeal = dummyMeal.flat(Infinity)
      flatDummyMeal.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
     
      })
         
        console.log(this.mealTypeArray);
        
         
       })
     }

     
     addIngredients(input:any){
      if(input.value){
        this.ingredientArray.push(input.value)
        input.value=""
        console.log(this.ingredientArray);
        
      }
     }

     removeIngredient(value:string){
      this.ingredientArray = this.ingredientArray.filter((item:string)=>item!=value)
     }

     addInstruction(input:any){
      if(input.value){
        this.instructionArray.push(input.value)
        input.value = ""
        console.log(this.instructionArray);
        
      }
     }
     removeInstruction(value:string){
      this.instructionArray=this.instructionArray.filter((item:string)=>item!=value)
     }

     mealTypeSelect(event:any){
     if(event.target.checked){
      !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
     }else{
      this.mealArray= this.mealArray.filter((item:any)=>item!=event.target.name)
     }
     console.log(this.mealArray);
     
     }

     removeMealType(meal:string){
      this.mealArray=this.mealArray.filter((item:string)=>item!=meal)
     }
     addRecipe(){
      console.log(this.recipeDetails);
      // add ingredients instruction and meal array to recipeDetails
      this.recipeDetails.ingredients=this.ingredientArray
      this.recipeDetails.instructions=this.instructionArray
      this.recipeDetails.mealType=this.mealArray
      const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,mealType,image}=this.recipeDetails
      // check all fields are not empty
      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && mealType!.length>0 && image){
        // if all values present then api call
        this.api.addRecipeApi(this.recipeDetails).subscribe({
          next:(res:any)=>{
            alert("recipe added successfully")
            this.recipeDetails={}
            this.ingredientArray=[]
            this.mealArray=[]
            this.instructionArray=[]
            this.router.navigateByUrl('/admin/recipe-list')

          },
          error:(reason:any)=>{
            alert(reason.error)
            this.recipeDetails.name=""
          }
        })
       
      }else{
        alert("please fill all fields")
      }
     }
     editRecipe(){
      // add ingredients instruction and meal array to recipeDetails
      this.recipeDetails.ingredients=this.ingredientArray
      this.recipeDetails.instructions=this.instructionArray
      this.recipeDetails.mealType=this.mealArray
      const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,mealType,image}=this.recipeDetails
      if (!this.id) {
        alert("Recipe ID is missing!");
        return;
      }
      // check all fields are not empty
      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && mealType!.length>0 && image){
        // if all values present then api call
        this.api.editRecipeApi(this.id,this.recipeDetails).subscribe((res:any)=>{
          alert("recipe updated successfully")
            this.recipeDetails={}
            this.ingredientArray=[]
            this.mealArray=[]
            this.instructionArray=[]
            this.router.navigateByUrl('/admin/recipe-list')
        })
      }else{
        alert("please fill all fields")
      }
     }
}
