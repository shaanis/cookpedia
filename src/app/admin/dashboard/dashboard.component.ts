import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts:typeof Highcharts=Highcharts
  chartOptions={}
  selected = new Date()
  isSidebarOpen:Boolean = true
  columnWidth:string = "col-lg-10"
  userCount:number=0
  recipeCount:number=0
  downloadCount:number=0
  requestCount:number=0

  constructor(private router:Router, private api:ApiService){
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart") || "")
      this.chartOptions ={
        chart:{
          type:"bar"
        },
        title:{
          text:'Analysis of Download Recipes',
          align:'left'
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          title:{
            text:'Total Dowload Recipe Count'
          }
        },
        legend:{
          enable:false
        },
        credits:{
          enabled:false
        },
        series:[{
          name:"cuisine",
          colorByPoint: true,
          type:"bar",
          data:chartData
        }],
        accessibility:{
          enabled:false
        }
      }
    }
  }
  
  ngOnInit(){
    this.getUserCount()
    this.getDownloadCount()
    this.getRecipeCount()
    this.getRequestCount()
  }

  menuButton(){
    this.isSidebarOpen = !this.isSidebarOpen
    this.columnWidth = "col"
  }
  logoutAdmin(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }
  getUserCount(){
   this.api.getAllUserApi().subscribe((res:any)=>{
    this.userCount=res.length
   })
  }
  getRecipeCount(){
   this.api.getAllRecipesApi().subscribe((res:any)=>{
    this.recipeCount=res.length
    
   })
  }
  getDownloadCount(){
   this.api.getAlldwnldApi().subscribe((res:any)=>{
    this.downloadCount=res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
    console.log(this.downloadCount);
    
    
   })
  }
  getRequestCount(){
   this.api.getAllfeedbackApi().subscribe((res:any)=>{
    this.requestCount=res.filter((item:any)=>item.status == "pending").length
    console.log(this.requestCount);
    
   })
  }
}
