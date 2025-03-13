import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedin:boolean = false
  loginuser:string=""

  constructor(private router: Router){}

  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedin = true
      this.loginuser = JSON.parse(sessionStorage.getItem("user")|| "").username
    }else{
      this.isLoggedin=false
      this.loginuser=""
    }
  }

  logout(){
    sessionStorage.clear()
    this.isLoggedin=false
    this.loginuser=""
  }
}
