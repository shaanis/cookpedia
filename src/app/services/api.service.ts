import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  serverurl ="http://localhost:3000"
   serverurl ="https://cookpedia-server-dyzx.onrender.com"

  constructor(private http:HttpClient) { }
  getAllRecipesApi(){
      return this.http.get(`${this.serverurl}/all-recipes`)
  }

  addTestimonyApi(reqBody:any){
   return this.http.post(`${this.serverurl}/add-testimony`,reqBody)
  }

  addUserApi(reqBody:any){
   return this.http.post(`${this.serverurl}/add-user`,reqBody)
  }

  loginApi(reqBody:any){
   return this.http.post(`${this.serverurl}/login`,reqBody)
  }

   appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
   }

    
   viewRecipeApi(recipeId:String){
    return this.http.get(`${this.serverurl}/recipe/${recipeId}/view`,this.appendToken())
   }
   
   relatedRecipeApi(cuisine:String){
    return this.http.get(`${this.serverurl}/relatedrecipe?cuisine=${cuisine}`,this.appendToken())
   }
   
   dwldRecipeApi(recipeId:String,reqBody:any){
    return this.http.post(`${this.serverurl}/${recipeId}/download`,reqBody,this.appendToken())
   }
   saveRecipeApi(recipeId:String,reqBody:any){
    return this.http.post(`${this.serverurl}/${recipeId}/save`,reqBody,this.appendToken())
   }
   showSavedRecipeApi(){
    return this.http.get(`${this.serverurl}/showsave`,this.appendToken())
   }
   delteSavedRecipeApi(id:String){
    return this.http.delete(`${this.serverurl}/${id}/remove-saved`,this.appendToken())
   }
   getDwldRecipeApi(){
    return this.http.get(`${this.serverurl}/user-download`,this.appendToken())
   }
  //  edit user profile
   editUserApi(reqBody:any){
    return this.http.put(`${this.serverurl}/edit-profile`,reqBody,this.appendToken())
   }
  //  get all users for admin 
   getAllUserApi(){
    return this.http.get(`${this.serverurl}/all-users`,this.appendToken())
   }
  //  get all downloads for admin 
   getAlldwnldApi(){
    return this.http.get(`${this.serverurl}/all-downloads`,this.appendToken())
   }
  //  get all feedback for admin 
   getAllfeedbackApi(){
    return this.http.get(`${this.serverurl}/all-testimony`,this.appendToken())
   }
  //  get all feedback for admin 
   updateFeedbackApi(id:String,status:String){
    return this.http.get(`${this.serverurl}/feedback/${id}/update?status=${status}`,this.appendToken())
   }
   getApprovedFeedbackApi(){
    return this.http.get(`${this.serverurl}/approved-feedback`,this.appendToken())
   }
  //  add recipe
   addRecipeApi(reqBody:any){
    return this.http.post(`${this.serverurl}/add-recipe`,reqBody,this.appendToken())
   }
  //  edit recipe
   editRecipeApi(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.serverurl}/recipe/${id}/edit`,reqBody,this.appendToken())
   }
  //  delete recipe
   removeRecipeApi(id:string){
    return this.http.delete(`${this.serverurl}/recipe/${id}/remove`,this.appendToken())
   }
   getChartData(){
    this.getAlldwnldApi().subscribe((res:any)=>{
      
    let dwnldArrayList:any=[]
    let output:any={}
    res.forEach((item:any)=>{
      let cuisine = item.Cuisine
      let currentCount = item.count 
      if(output.hasOwnProperty(cuisine)){
        output[cuisine]+=currentCount
      }else{
        output[cuisine]=currentCount
      }
    })
    console.log(output);
    for(let cuisine in output){
      dwnldArrayList.push({name:cuisine,y:output[cuisine]})
    }
    console.log(dwnldArrayList);
    localStorage.setItem("chart",JSON.stringify(dwnldArrayList))
    

    })
   }


}
