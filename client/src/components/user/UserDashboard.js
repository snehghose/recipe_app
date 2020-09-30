import React, { Component } from 'react';
import Categories from './categories/Categories';
import Recipes from './recipes/Recipes'

class UserDashboard extends Component {
    render() {
        return (
            <div className="container">
                <Categories/>
                <div className="my-5 text-center">
                    <h3>Explore your favorite recipes</h3>
                </div>
                <Recipes/>
            </div>
        )
    }
}

export default UserDashboard;