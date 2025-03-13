import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profilImg:String = "https://tse1.mm.bing.net/th?id=OIP._jKjZYeqWX6e6E7DpcOM_gHaHa&pid=Api&P=0&h=180"
  allUserDowloadList:any = []

  constructor(private api: ApiService){}
  ngOnInit(){
    this.getUserDowloads()
    const user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.profilePic){
      this.profilImg = user.profilePic
    }
  }

  getUserDowloads(){
    this.api.getDwldRecipeApi().subscribe((res:any)=>{
      this.allUserDowloadList=res
      console.log(this.allUserDowloadList);
      
    })
  }

  getFile(event:any){
   let uploadFile = event.target.files[0]
   let fr = new FileReader()
   fr.readAsDataURL(uploadFile)
   fr.onload=(event:any)=>{
    console.log(event.target.result);
    this.profilImg=event.target.result
    
   }
  }
  updateProfile(){
    this.api.editUserApi({profilePic:this.profilImg}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profilImg = res.profilePic
      alert("profile updated!!")
    })
  }

}
