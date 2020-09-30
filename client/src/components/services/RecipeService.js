import AuthService from './AuthService';

const URI = "/api/recipe/";

class RecipeService {

    async getRecipesByCategory(categoryId) {
        const response = await fetch(URI+`category/${categoryId}`);
        var recipes=[]
        if(response.status===200)
        recipes= await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
        return recipes;
    }

    async checkName(name) {
        const response=await fetch(URI+`check/${name}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Cannot fetch. Please refresh.");
            window.location.reload();
        }
    }

    async getRecipeById(id) {
        const response = await fetch(URI+`id/${id}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async getRecipeByName(name) {
        const response = await fetch(URI+`${name}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async getAllRecipes() {
        const response = await fetch(URI);
        if(response.status===200)
        return await response.json()
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async getNotApprovedRecipes() {
        const response = await fetch(URI+'not-approved', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            }
        });
        if(response.status===200)
        return await response.json()
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async addRecipe(recipe) {
        const response=await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            },
            body:JSON.stringify(recipe)
        })
        if(response.status!==200) {
            alert("Recipe could not be posted. Please refresh.")
        }
        else {
            alert("Recipe posted successfully!!! \nYour recipe will be visible after Admin approval.")
        }
    }

    async recipeApproval(id) {
        const response=await fetch(URI+`${id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            }
        });
        if(response.status!==200) {
            alert("Please refresh.")
            AuthService.logout()
            window.location.replace('/login')
        }
    }
}

export default new RecipeService();