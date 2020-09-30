import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import Recipe from '../user/recipes/Recipe';

class AdminDashboard extends Component {
    state={recipes:[], approvedRecipes:[]}

    async componentDidMount(){
        this.setState({
            recipes: await RecipeService.getNotApprovedRecipes(),
            approvedRecipes: await RecipeService.getAllRecipes()
        });
    }

    render() {
        return (
            <div className="container">
                {this.state.recipes.length>0 && <>
                    <div className="row justify-content-center text-danger my-3">
                        <h3>Pending Approvals</h3>
                    </div>
                    <div className="row">
                        {this.state.recipes.map((recipe)=>(
                            <div key={recipe._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                                <Recipe key={recipe._id} recipe={recipe} history={this.props.history}/>
                            </div>
                        ))}
                    </div>
                </>}
                {this.state.approvedRecipes.length>0 && <>
                <hr/>
                    <div className="row justify-content-center text-success my-3">
                        <h3>Approved Recipes</h3>
                    </div>
                    <div className="row">
                        {this.state.approvedRecipes.map((recipe)=>(
                            <div key={recipe._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                                <Recipe key={recipe._id} recipe={recipe} history={this.props.history}/>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        )
    }
}

export default AdminDashboard;