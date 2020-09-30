import React, { Component } from 'react';
import ManageCategory from './ManageCategory';
import CategoryService from '../../services/CategoryService';

class ManageCategories extends Component {
    constructor() {
        super()
        this.state={
            categories:[], 
            category:{
                name:'',
                image:''
            },
            errors:{
                name:'',
                image:''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
    }

    async componentDidMount() {
        this.setState({ categories: await CategoryService.getAllCategories()});
    }

    handleChange(event) {
        event.preventDefault();
        var category=this.state.category;
        var errors=this.state.errors;
        const {name,value} = event.target;
        category[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>4?'':'Category Name should have atleast 4 characters';
                break;
            case 'image':
                errors.image=value.length>0?'':"Category Image is required";
                break;
        }
        this.setState({category:category, errors:errors})
    }

    async handleAdd(event) {
        event.preventDefault()
        var category=this.state.category
        var errors=this.state.errors
        let flag=0;
        Object.keys(category).forEach(key=>{
            errors[key]=category[key].length>0?'':'Category '+key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            await CategoryService.addCategory(this.state.category)
            window.location.reload()
        }
        else
        this.setState({errors:errors})
    }

    render(){
        const categories=this.state.categories;
        return (
            <div className="container">
                <div className="row mb-3">
                    <span className="ml-5">
                        <h4>Categories</h4>
                    </span>
                    <span className="float-right ml-auto mr-5" style={{cursor:'pointer'}} data-toggle="collapse" data-target="#add-category">
                        <i className="fas fa-plus"></i> Add
                    </span>
                </div>
                <ul className="list-group">
                    <li id="add-category" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="form-group">
                                <h5>Add New Category</h5>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Category Name</label>
                                    <input className="form-control" type="text" placeholder="Enter Category Name" name="name" onChange={this.handleChange}/>
                                    {this.state.errors.name.length>0 && <small className="text-danger">{this.state.errors.name}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Image URL</label>
                                    <input className="form-control" type="text" placeholder="Enter Image URL" name="image" onChange={this.handleChange}/>
                                    {this.state.errors.image.length>0 && <small className="text-danger">{this.state.errors.image}</small>}
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-success" onClick={this.handleAdd} data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion">
                    <ul className="list-group mb-5">
                        {categories.map(category=>(
                            <ManageCategory key={category._id} category={category}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ManageCategories;