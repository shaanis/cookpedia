import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 allusers:any=[]
 
 constructor(private api:ApiService){}
 
 ngOnInit(){
  this.getUsers()
 }

 getUsers(){
  this.api.getAllUserApi().subscribe((res)=>{
    this.allusers=res
    console.log(this.allusers);
    
  })
 }
}
