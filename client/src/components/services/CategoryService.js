import AuthService from './AuthService';

const URI="/api/category/";

class CategoryService {

    async getAllCategories() {
        const response=await fetch(URI);
        if(response.status===200)
        return await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async getIdByName(name) {
        const response=await fetch(URI+`${name}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async getById(categoryId) {
        const response=await fetch(URI+`id/${categoryId}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Please refresh.");
            window.location.reload();
        }
    }

    async updateCategory(category) {
        const response=await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            },
            body:JSON.stringify(category)
        })
        if(response.status!==200) {
            alert("Please refresh.")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addCategory(category) {
        const response=await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            },
            body:JSON.stringify(category)
        })
        if(response.status!==200) {
            alert("Please refresh.")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async deleteCategory(id) {
        const response=await fetch(URI+`${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            }
        })
        if(response.status!==200) {
            alert("Please refresh.")
            AuthService.logout()
            window.location.replace('/login')
        }
    }
}

export default new CategoryService();