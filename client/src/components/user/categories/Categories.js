import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import Category from './Category';

class Categories extends Component {
    state={categories:[]};

    async componentDidMount(){
        this.setState({categories:await CategoryService.getAllCategories()})
    }
    
    render() {
        return (
            <div>
                <div className="my-5 text-center">
                    <h3>Select your favorite cuisine</h3>
                </div>
                <div className="row justify-content-center">
                    {this.state.categories.map(category=>(
                        <div key={category._id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                            <Category key={category._id} category={category}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Categories;