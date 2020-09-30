import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import '../../App.css'

class ManageCategory extends Component {
    constructor(props) {
        super()
        this.state={
            category:props.category,
            errors:{
                name:'',
                image:''
            }
        }
        console.log(props.category);
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
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

    async handleUpdate(event) {
        event.preventDefault();
        var category=this.state.category
        var errors=this.state.errors
        let flag=0;
        errors.name=category.name.length>0?'':'Category Name is required';
        errors.image=category.image.length>0?'':'Category Image is required';
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        console.log(flag)
        if(flag===0) {
            
            await CategoryService.updateCategory(this.state.category)
            window.location.reload()
        }
        else
        this.setState({errors:errors})
    }

    async handleDelete(event) {
        event.preventDefault();
        await CategoryService.deleteCategory(this.state.category._id)
        window.location.reload()
    }

    render(){
        const category=this.state.category;
        return(
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-4 col-sm-3 col-md-2 col-xl-1 text-center my-auto">
                        <div className="embed-responsive embed-responsive-4by3">
                            <img className="embed-responsive-item" src={category.image} alt={category.name}/>
                        </div>
                    </div>
                    <div className="col-5 col-sm-6 col-md-6 col-xl-7 my-auto">
                        <strong className="blockquote">{category.name}</strong>
                    </div>
                    <div className="col-3 col-sm-3 col-md-4 my-auto">
                        <div className="text-danger float-right mx-3" style={{cursor:'pointer'}} data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDelete}>
                            <i className="fas fa-trash-alt"></i>
                        </div>
                        <div className="text-primary float-right mx-3" style={{cursor:'pointer'}} data-toggle="tooltip" data-placement="top" title="Edit" data-toggle="collapse" data-target={"#category"+category._id}>
                            <i className="fas fa-pencil-alt"></i>
                        </div>
                    </div>
                </div>
                <div id={"category"+category._id} className="collapse justify-content-between mt-1" data-parent="#accordion">
                    <hr/>
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Category Name</label>
                                <input className="form-control" type="text" value={category.name} name="name" onChange={this.handleChange}/>
                                {this.state.errors.name.length>0 && <small className="text-danger">{this.state.errors.name}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Image URL</label>
                                <input className="form-control" type="text" value={category.image} name="image" onChange={this.handleChange}/>
                                {this.state.errors.image.length>0 && <small className="text-danger">{this.state.errors.image}</small>}
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-success" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            </li>
        )
    }
}

export default ManageCategory;