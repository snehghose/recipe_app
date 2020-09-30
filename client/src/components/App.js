import React , { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './site/signup/SignUp';
import Login from './site/login/Login';
import Header from './site/header/Header';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import ViewRecipe from './user/recipes/ViewRecipe';
import Recipes from './user/recipes/Recipes';
import Profile from './site/profile/Profile';
import AddPost from './user/posts/AddPost';
import ManageCategories from './admin/manage-categories/ManageCategories';

class App extends Component {
    render() {
        return (
            <div className="background">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact={true} component={UserDashboard}/>
                    <Route path="/admin" component={AdminDashboard}/>
                    <Route path="/categories" component={ManageCategories}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/recipe/:id" component={ViewRecipe}/>
                    <Route path="/recipes/**" component={Recipes}/>
                    <Route path="/post" component={AddPost}/>
                </Switch>
                <div className="container-fluid footer text-light bg-info">
                    <div className="float-right">
                        <small>Copyright &copy; 2020 S.G.</small>
                    </div>
                </div>
            </Router>
            </div>
        )
    }
}

export default App;
