import { jsPDF } from 'jspdf';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

  recipeId:string = ""
  recipe:any={}
  allRelatedRecipe:any=[]
  constructor(private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      this.recipeId = res.id 
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
      
    })
  }

  getRecipeDetails(recipeId:string){
    this.api.viewRecipeApi(recipeId).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
      
    })
  }

  getAllRelatedRecipes(cuisine:String){
    this.api.relatedRecipeApi(cuisine).subscribe((res:any)=>{
     if(res.length>1){
      this.allRelatedRecipe = res.filter((item:any)=>item.name!= this.recipe.name)
      console.log(this.allRelatedRecipe);
      
     }else{
      this.allRelatedRecipe=[]
     }
    })
  }

  downloadRecipe(){
    this.api.dwldRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.generatePdf()
      //call get chart data
      this.api.getChartData()
    })
  }

  generatePdf(){
    const pdf =new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings: ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of cooking: ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total prepration time: ${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Total cokking time: ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Total calorie per Servings: ${this.recipe.caloriesPerServing}`,10,45)

    let head =[['Ingredients Needed','Cooking Instructions']]
    let body =[]
    body.push([this.recipe.ingredients
      ,this.recipe.instructions
    ])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save(`${this.recipe.name}.pdf`)
  }

  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
     next:(res:any)=>{
      alert("addedd successfully")
     },
     error:(reason:any)=>{
      alert(reason.error)
     }
    })
  }
}
