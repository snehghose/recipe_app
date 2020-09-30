import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeService from '../../services/RecipeService';
import CategoryService from '../../services/CategoryService';

class Recipes extends Component {
    state={recipes:[]};
    
    async componentDidMount(){
        var path=window.location.pathname
        var arr=path.split('/');
        var recipes = [];
        if(arr[arr.length-2]==='category')
        {
            const id = await CategoryService.getIdByName(arr[arr.length-1]);
            recipes = await RecipeService.getRecipesByCategory(id);
        }
        else
        recipes = await RecipeService.getAllRecipes();
        this.setState({recipes:recipes})
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    {this.state.recipes.map((recipe)=>(
                        <div key={recipe._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Recipe key={recipe._id} recipe={recipe} history={this.props.history}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Recipes;