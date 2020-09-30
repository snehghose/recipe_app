import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import RecipeService from '../../services/RecipeService';

class AddPost extends Component {
    constructor() {
        super()
        this.state={ 
            categories:[], 
            recipe:{
                name: '',
                category: '',
                description: '',
                time: '',
                servings: '',
                image: '',
                ingredients:'',
                steps:''
            },
            errors:{
                name: '',
                category: '',
                description: '',
                time: '',
                servings: '',
                image: '',
                ingredients: '',
                steps: ''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }
    
    async componentDidMount() {
        this.setState({ categories: await CategoryService.getAllCategories() });
    }
    
    async handleChange(event) {
        event.preventDefault();
        var recipe=this.state.recipe;
        var errors=this.state.errors;
        const {name,value} = event.target;
        recipe[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>3?'':'Name should have atleast 4 characters';
                errors.name=value.length>=4 && await RecipeService.checkName(value)?'Recipe name already exists':errors.name;
                break;
            case 'image':
                errors.image=value.length>0?'':'Image URL is required';
                break;
            case 'description':
                errors.description=value.length>0?'':'Description is required';
                break;
            case 'time':
                errors.time=isNaN(value)?'Invalid time':'';
                break;
            case 'servings':
                errors.servings=isNaN(value)?'Invalid number of servings':'';
                break;
            case 'category':
                errors.category=value.length>0?'':'Category is required';
                break;
            case 'ingredients':
                errors.ingredients=value.length>3?'':'Ingredients is required';
                break;
            case 'steps':
                errors.steps=value.length>0?'':'Steps is required';
                break;
        }
        this.setState({recipe:recipe, errors:errors})
    }
    
    async handleAdd(event) {
        event.preventDefault()
        var recipe=this.state.recipe
        var errors=this.state.errors
        let flag=0;
        Object.keys(recipe).forEach(key=>{
            errors[key]=recipe[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            var newRecipe = {
                name: this.state.recipe.name,
                categoryId: await CategoryService.getIdByName(this.state.recipe.category),
                description: this.state.recipe.description,
                time: this.state.recipe.time,
                servings: this.state.recipe.servings,
                image: this.state.recipe.image,
                ingredients: this.state.recipe.ingredients.split('#'),
                steps: this.state.recipe.steps.split('#'),
                isApproved:false
            };
            console.log(newRecipe)
            await RecipeService.addRecipe(newRecipe);
            window.location.reload()
        }
        else
        this.setState({errors:errors})
    }
    
    render() {
        return (
            <div className="container">
                <div className="row ml-3 mt-5">
                    <h3>Add New Recipe</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item justify-content-between mt-1">
                            <form>
                                <div className="row">
                                    <div className="col-12 col-md-6 my-2">
                                        <label>Item Name</label>
                                        <input className="form-control" type="text" name="name" placeholder="Enter Item Name" onChange={this.handleChange}/>
                                        {this.state.errors.name.length>0 && <small className='text-danger'>{this.state.errors.name}</small>}
                                    </div>
                                    <div className="col-12 col-md-6 my-2">
                                        <label>Category Name</label>
                                        <select className="form-control" name="category" id="category" onChange={this.handleChange}>
                                            <option className="font-italic" defaultValue="" selected={true} disabled={true}>Choose Category</option>
                                            {this.state.categories.map((category)=>(
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            ))}
                                        </select>
                                        {this.state.errors.category.length>0 && <small className='text-danger'>{this.state.errors.category}</small>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <label>Description</label>
                                        <input className="form-control" type="text" name="description" placeholder="Enter Description" onChange={this.handleChange}/>
                                        {this.state.errors.description.length>0 && <small className='text-danger'>{this.state.errors.description}</small>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 my-2">
                                        <label>Total Time</label>
                                        <input className="form-control" type="text" name="time" placeholder="Enter Time (minutes)" onChange={this.handleChange}/>
                                        {this.state.errors.time.length>0 && <small className='text-danger'>{this.state.errors.time}</small>}
                                    </div>
                                    <div className="col-12 col-md-6 my-2">
                                        <label>Servings</label>
                                        <input className="form-control" type="text" name="servings" placeholder="Enter No. of Servings" onChange={this.handleChange}/>
                                        {this.state.errors.servings.length>0 && <small className='text-danger'>{this.state.errors.servings}</small>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <label>Image URL</label>
                                        <input className="form-control" type="text" name="image" placeholder="Enter Image URL" onChange={this.handleChange}/>
                                        {this.state.errors.image.length>0 && <small className='text-danger'>{this.state.errors.image}</small>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <label>Ingredients</label>
                                        <textarea className="form-control" type="text" name="ingredients" placeholder={"Enter Ingredients separated by '#'"+`\n`+"Example: first ingredient#second ingredient#...#last ingredient"} onChange={this.handleChange}/>
                                        {this.state.errors.ingredients.length>0 && <small className='text-danger'>{this.state.errors.ingredients}</small>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <label>Preparation Steps</label>
                                        <textarea className="form-control" type="text" name="steps" placeholder={"Enter Preparation Steps separated by '#'"+`\n`+"Example: first step#second step#...#last step"} onChange={this.handleChange}/>
                                        {this.state.errors.steps.length>0 && <small className='text-danger'>{this.state.errors.steps}</small>}
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <button className="btn btn-success" onClick={this.handleAdd}>Add</button>
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddPost;