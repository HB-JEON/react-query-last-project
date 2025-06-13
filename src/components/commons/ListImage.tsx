import {FC} from "react"
import {Link} from "react-router-dom";
import {Recipe,ListImageProps} from "../../types";

// FC => React.FC => props <ListImage data="">

const ListImage:FC<ListImageProps>=({recipe,index})=>{
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                <div className="post-thumb">
                    <Link to={`/recipe/detail/${recipe.no}`}>
                        <img src={recipe.poster} alt={""}/>
                    </Link>
                </div>

                <div className="post-content">
                    <div className="post-meta d-flex">
                        <div className="post-author-date-area d-flex">

                            <div className="post-author">
                                <a href="#">{recipe.chef}</a>
                            </div>

                            <div className="post-date">
                                <a href="#"></a>
                            </div>
                        </div>

                        <div className="post-comment-share-area d-flex">

                            <div className="post-favourite">
                                <a href="#"><i className="fa fa-heart-o"
                                               aria-hidden="true"></i>{recipe.likecount} </a>
                            </div>

                            <div className="post-comments">
                                <a href="#"><i className="fa fa-comment-o"
                                               aria-hidden="true"></i>{recipe.hit} </a>
                            </div>

                            <div className="post-share">
                                <a href="#"><i className="fa fa-share-alt"
                                               aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                    <Link to={`/recipe/detail/${recipe.no}`}>
                        <h4 className="post-headline">{recipe.title}</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ListImage;