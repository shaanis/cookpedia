import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
 allFeedback:any = []


 constructor(private api:ApiService){}
 ngOnInit(){
  this.getallFeedback()
 }

 getallFeedback(){
  this.api.getAllfeedbackApi().subscribe((res:any)=>{
    this.allFeedback = res 
    console.log(this.allFeedback);
    
  })
 }

 updateFeedbackStatus(id:String,status:String){
   this.api.updateFeedbackApi(id,status).subscribe((res:any)=>{
    this.getallFeedback()
   })
 }
}

