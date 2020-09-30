import React from 'react';
import { Link } from 'react-router-dom';
import '../User.css';

function Recipe(props) {
    const recipe=props.recipe;
    const goto = {
        pathname:"/recipe/"+recipe.name
    }
    return (
        <Link className="card mb-5" style={{textDecoration:'none'}} to={goto}>
            <div className="card">
                <div className="embed-responsive embed-responsive-4by3">
                    <img className="card-img-top embed-responsive-item" src={recipe.image} alt={recipe.name}/>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 text-center text-overflow blockquote">
                            <strong>{recipe.name}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Recipe;