import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import '../User.css';

class ViewRecipe extends Component {
    constructor() {
        super();
        this.state = {recipe:{
            _id: '',
            name: '',
            categoryId: '',
            description: '',
            time: '',
            servings: '',
            image: '',
            ingredients: [],
            steps: [],
            isApproved: ''
        }};
        this.handleApproval = this.handleApproval.bind(this);
    }
    
    async componentDidMount(){
        var path=window.location.pathname
        path=path.substring(path.lastIndexOf('/')+1);
        this.setState({recipe:await RecipeService.getRecipeByName(path)})
    }

    async handleApproval(){
        await RecipeService.recipeApproval(this.state.recipe._id);
        window.location.replace('/admin');
    }

    render() {
        const recipe = this.state.recipe;
        const user = JSON.parse(sessionStorage.getItem('user'));
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="embed-responsive embed-responsive-4by3">
                            <img className="embed-responsive-item" src={recipe.image} alt={recipe.name}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row blockquote my-3">
                            <div className="col-12 style-text">
                                {recipe.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row blockquote text-center">
                            <div className="col-4">
                                <div className="">{recipe.ingredients.length}</div>
                                <div>Ingredients</div>
                            </div>
                            <div className="col-4">
                                <div>{recipe.time}</div>
                                <div>Minutes</div>
                            </div>
                            <div className="col-4">
                                <div>{recipe.servings}</div>
                                <div>Servings</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row blockquote text-center">
                            <div>{recipe.description}</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="blockquote">
                    <div className="row style-text mx-3 my-2">Ingredients</div>
                    <div>
                        <ol>
                            {recipe.ingredients.map((data, i) => {
                                return <li key={i}>{data}</li>
                            })}
                        </ol>
                    </div>
                </div>
                <hr/>
                <div className="blockquote">
                    <div className="row style-text mx-3 my-2">Steps</div>
                    <div>
                        <ol>
                            {recipe.steps.map((data, i) => {
                                return <li key={i}>{data}</li>
                            })}
                        </ol>
                    </div>
                </div>
                {user!==null && user.isAdmin && !recipe.isApproved && <div className="row my-5 justify-content-center">
                    <button className="btn btn-success" onClick={this.handleApproval}><h5>Approve Recipe</h5></button>
                </div>}
                {user!==null && user.isAdmin && recipe.isApproved && <div className="row my-5 justify-content-center">
                    <button className="btn btn-danger" onClick={this.handleApproval}><h5>Disapprove Recipe</h5></button>
                </div>}
            </div>
        )
    }
};

export default ViewRecipe;