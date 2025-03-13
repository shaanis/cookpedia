export class RecipeModel{
    name?:string 
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes?:number
    cookTimeMinutes?:number
    servings?:number
    difficulty?:string
    cuisine?:string
    caloriesPerServing?:number
    mealType?:Array<string>
    image?:string
}