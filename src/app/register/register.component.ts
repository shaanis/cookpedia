import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   registerForm:FormGroup
   

   constructor(private fb:FormBuilder, private api:ApiService,private router:Router){
    this.registerForm = this.fb.group({
      username:["",[Validators.required,Validators.pattern("[a-zA-z]*")]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern("[a-zA-z0-9]*")]],
    })
   }
   register(){
    if(this.registerForm.valid){
      const username = this. registerForm.value.username
      const email = this. registerForm.value.email
      const password = this. registerForm.value.password
      this.api.addUserApi({email,username,password}).subscribe({
        next:(res:any)=>{
          alert(`welcom ${res.username},`)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.registerForm.reset()
        }
      })
    }
   }
}
