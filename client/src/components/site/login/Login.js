import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class Login extends Component {

    constructor() {
        super();
        this.state={
            user:{
                username:'',
                password:''
            },
            errors:{
                username:'',
                password:''
            }
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    

    handleChange(event) {
        var user=this.state.user;
        var errors=this.state.errors
        const {name,value}=event.target
        user[name]=value;
        switch(name) {
            case 'username':
                errors.username=value.length>0?'':'Username is required'
                break;
            case 'password':
                errors.password=value.length>0?'':'Password is required'
                break;
            default:
                window.location.reload();
        }
        this.setState({user:user,errors:errors});
    }

    async handleLogin(event) {
        event.preventDefault();
        var errors=this.state.errors;
        let flag=0;
        if(this.state.user.username.length===0)
        errors.username='Username is required'
        if(this.state.user.password.length===0)
        errors.password='Password is required'
        Object.values(errors).forEach(value=>{
            if(value.length>0)
            flag++;
        })
        if(flag===0)
        await AuthService.login(this.state.user);
        else
        this.setState({errors:errors})
    }
    
    render() {
        return (
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row ml-1 mb-3">
                            <h3>Login</h3>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form onSubmit={this.handleLogin}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input className="form-control" type="text" name="username" placeholder="Enter User ID" onChange={this.handleChange}></input>
                                        {this.state.errors.username.length>0 && <small className="text-danger">{this.state.errors.username}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                        {this.state.errors.password.length>0 && <small className="text-danger">{this.state.errors.password}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input className="btn btn-success" type="submit" value="Login"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;