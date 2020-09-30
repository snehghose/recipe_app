import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService';


class Header extends Component{

    constructor() {
        super();
        this.handleLogout=this.handleLogout.bind(this);
    }

    async handleLogout(event){
        event.preventDefault();
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload()
    }

    render() {
        const user=JSON.parse(sessionStorage.getItem('user'))
        var path="/";
        if(user!==null && user.isAdmin===true) {
            path="/admin";
        }
        return (
            <div className="mb-4 header">
                <nav className="navbar header navbar-fixed-top navbar-light bg-success navbar-expand-sm">
                    <div className="nav-item">
                        <Link className="nav-link text-light" to={path}>
                            <h3><i className="fas fa-utensils"></i> Recipe Book</h3>
                        </Link>
                    </div>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navcontent">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navcontent">
                        <ul className="navbar-nav ml-auto">
                            {user===null &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/signup">Sign Up</Link>
                                </li>}
                            {user===null &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/login">Login</Link>
                                </li>}
                            {user!==null && user.isAdmin===false &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/post">Add Recipe</Link>
                                </li>}
                            {user!=null && user.isAdmin &&
                                <li className="nav-item dropdown text-light">
                                    <a className="nav-link dropdown-toggle text-light" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Tasks
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <Link className="dropdown-item" to="/admin">Manage Recipes</Link>
                                        <Link className="dropdown-item" to="/categories">Manage Categories</Link>
                                        <Link className="dropdown-item" to="/signup">Add New Admin</Link>
                                    </div>
                                </li>}
                            {user!=null &&
                                <li className="nav-item dropdown text-light">
                                    <a className="nav-link dropdown-toggle text-light" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Profile
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <Link className="dropdown-item" to="/profile">Change Password</Link>
                                        <div className="dropdown-divider"/>
                                        <button className="dropdown-item" onClick={this.handleLogout}>Logout</button>
                                    </div>
                                </li>}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Header);