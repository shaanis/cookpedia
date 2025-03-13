import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonyForm:FormGroup
  email:string = "user@gmail.com"
  constructor(private fb:FormBuilder, private api:ApiService){
    this.testimonyForm = fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.email]],
      msg:["",[Validators.required, Validators.pattern("[a-zA-z0-9 ]*")]]
    })
  }

  addTestimony(){
    if(this.testimonyForm.valid){
     const name = this.testimonyForm.value.name
     const email = this.testimonyForm.value.email
     const msg = this.testimonyForm.value.msg
    //  alert(`${name},${email},${msg}`)
      this.api.addTestimonyApi({name,email,msg}).subscribe((res:any)=>{
        alert("Thank You for your feedback")
        this.testimonyForm.reset()
      })
    }else{
      alert("invalid form")

    }
  }
}
