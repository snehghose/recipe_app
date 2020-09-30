import AuthService from './AuthService';

const URI="/api/user/"

class UserService {

    async getUser() {
        const response=await fetch(URI, {
            method:'GET', 
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
        }});
        if(response.status===200)
            sessionStorage.setItem('user',JSON.stringify(await response.json()))
        else {
            alert("Session Timeout");
            AuthService.logout();
            window.location.replace('/login');
        }
    }

    async updatePassword(password) {
        const response=await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            },
            body:JSON.stringify({ "password":password})
        })
        if(response.status===200)
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }

    }

    async checkUsername(username) {
        const response=await fetch(URI+`check/${username}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Cannot fetch. Please refresh.");
            window.location.reload();
        }
    }

}

export default new UserService();