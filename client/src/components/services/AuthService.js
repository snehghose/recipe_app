import UserService from './UserService';

const API_URL="/api/user/";

class AuthService {
    async signup(user) {
        const response=await fetch(API_URL, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)});
        if(response.status!==200) {
            alert("Please fill the fields properly.");
            return false;
        }
        return true;
    }

    async addAdmin(admin) {
        const response=await fetch(API_URL+"admin", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':sessionStorage.getItem('auth')
            },
            body:JSON.stringify(admin)
        })
        if(response.status!==200) {
            alert("Please fill the fields properly.");
            return false;
        }
        return true;
    }
    
    async login(user) {
        const response=await fetch(API_URL+"login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)});
        
        if(response.status===200) {
            const auth=await response.json()
            console.log(auth.token);
            sessionStorage.setItem('auth',auth.token);
            await UserService.getUser()
            user=JSON.parse(await sessionStorage.getItem('user'));
            if(user.isAdmin)
            window.location.replace("/admin");
            else
            window.location.replace("/");
        }
        else {
            alert("Invalid Username/Password");
            window.location.replace('/login')
        }
    }

    logout() {
        sessionStorage.setItem('user',JSON.stringify(null));
        sessionStorage.setItem('auth',JSON.stringify(null));
    }

}

export default new AuthService();
