import React from 'react';
import { Link } from 'react-router-dom';

function Category(props){
    const category=props.category;
    const goto = {
        pathname:"recipes/category/"+category.name
    }
    return (
        <Link className="mb-5" style={{textDecoration:'none'}} to={goto}>
            <div className="">
                <div className="embed-responsive embed-responsive-4by3">
                    <img className="embed-responsive-item rounded-circle" src={category.image} alt={category.name}/>
                </div>
                <div className="height p-2 text-center blockquote" style={{color:'tomato'}}>
                    <strong>
                        {category.name}
                    </strong>
                </div>
            </div>
        </Link>
    )
}

export default Category;