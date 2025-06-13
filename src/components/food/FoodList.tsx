import {Fragment,useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import PagePrint from "./PagePrint";
// 분리해서 사용
interface Food {
    name: string;
    type: string;
    hit: number;
    likecount: number;
    phone: string;
    fno: number;
    poster: string;
    num: number;
}
interface FoodListProps {
    list: Food[];
    totalpage:number;
    curpage:number;
    startPage:number;
    endPage:number;
}
function FoodList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading,isError,error,data}=useQuery<AxiosResponse<FoodListProps>,Error>({
        queryKey:["food-list",curpage], // 키 변경 => 서버연결
        queryFn: async ()=>{
            return await apiClient.get(`/food/list/${curpage}`);
        }
    })
    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    console.log(data?.data)

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>맛집 목록</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        {
                            data?.data.list.map((food:Food,index:number)=>
                                <div className="col-12 col-md-6 col-lg-4" key={index}>
                                    <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                                        <div className="post-thumb">
                                            <Link to={`/food/detail/${food.fno}`}>
                                                <img src={`https://www.menupan.com${food.poster}`} alt={""}/>
                                            </Link>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">

                                                    <div className="post-author">
                                                        <a href="#">{food.type}</a>
                                                    </div>

                                                    <div className="post-date">
                                                        <a href="#">{food.phone}</a>
                                                    </div>
                                                </div>

                                                <div className="post-comment-share-area d-flex">

                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i>{food.likecount} </a>
                                                    </div>

                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i>{food.hit} </a>
                                                    </div>

                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={`/food/detail/${food.fno}`}>
                                                <h4 className="post-headline">{food.name}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        {/* 페이지 나누기 */}
                        <div className="col-12">
                            <div className="pagination-area d-sm-flex mt-15">
                                <nav aria-label="#">
                                    {
                                        data?.data &&
                                        <PagePrint data={data.data}
                                                   setCurpage={setCurpage}/>
                                    }

                                </nav>
                                <div className="page-status">
                                    <p>Page {curpage} of {data?.data.totalpage} results</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default FoodList;