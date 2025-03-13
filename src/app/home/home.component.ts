import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any=[]
  approvedFeedback:any=[]

  constructor(private api:ApiService){ }
  ngOnInit(){
    this.getAllRecipes()
    this.getTestimony()
  }
  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      this.allRecipes=res.slice(0,6)
      console.log(this.allRecipes);
      
    })
  }

  getTestimony(){
    this.api.getApprovedFeedbackApi().subscribe((res:any)=>{
     this.approvedFeedback = res 
     console.log(this.approvedFeedback);
     
    })
  }
}
