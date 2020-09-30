import React, { Component } from 'react';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

class SignUp extends Component {

    constructor() {
        super();
        this.state={
            user:{
                username:'',
                password:''
            },
            password2:'',
            errors:{
                username:'',
                password:'',
                password2:''
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handlePassword=this.handlePassword.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        var user=this.state.user;
        var errors=this.state.errors;
        const {name,value}=event.target;
        user[name]=value;
        switch(name) {
            case 'username':
                errors.username=value.length<4?'Username should have atleast 4 characters':'';
                errors.username=value.length>=4 && await UserService.checkUsername(value)?'Username already exists':errors.username;
                break;
            case 'password':
                errors.password=value.length<8?'Password should have atleast 8 characters':'';
                break;
        }
        this.setState({user:user, errors:errors});
    }

    handlePassword(event) {
        event.preventDefault();
        const value=event.target.value;
        var errors=this.state.errors;
        errors.password2=value===this.state.user.password?'':'Passwords do not match';
        this.setState({password2:value,errors:errors})
    }

    async handleSubmit(event){
        event.preventDefault();
        var errors=this.state.errors;
        const user=this.state.user;
        let flag=0;
        errors.username=user.username.length>0?'':'Username is required';
        errors.password=user.password.length>0?'':'Password is required';
        errors.password2=this.state.password2.length>0?'':'Retype password';
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag=1;
        });
        if(flag===0) {
            const currentUser = JSON.parse(sessionStorage.getItem('user'));
            if(currentUser!==null && currentUser.isAdmin===true) {
                if(await AuthService.addAdmin(user))
                this.props.history.push('/admin');
            }
            else{
                if(await AuthService.signup(user))
                this.props.history.push('/login');
            }
        }
        else
        this.setState({errors:errors})
    }

    render(){
        return(
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row mx-2 my-2">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <label for="userId">Username</label>
                                            <input className="form-control" type="text" name="username" placeholder="Enter a username" onChange={this.handleChange}></input>
                                            {this.state.errors.username.length>0 && <small className="text-danger">{this.state.errors.username}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="password">Password</label>
                                            <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                            {this.state.errors.password.length>0 && <small className="text-danger">{this.state.errors.password}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="confirmPassword">Confirm Password</label>
                                            <input className="form-control" type="password" name="password2" placeholder="Retype Password" onChange={this.handlePassword}></input>
                                            {this.state.errors.password2.length>0 && <small className="text-danger">{this.state.errors.password2}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <button className="btn btn-success" onClick={this.handleSubmit}>Sign Up</button>
                                        </div>
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

export default SignUp;