import {Fragment,useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import {Recipe,RecipeListData} from "../../types";
import ListImage from "../commons/ListImage";
import PagePrint from "../commons/PagePrint";
// 분리해서 사용
// app.use(cors()) => NodeJS => CrossOrigin
function RecipeList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading,isError,error,data}=useQuery<AxiosResponse<RecipeListData>,Error>({
        queryKey:["recipe-list",curpage], // 키 변경 => 서버연결
        queryFn: async ()=>{
            return await apiClient.get(`/recipe/list/${curpage}`);
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
                                <h2>레시피 목록</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        {
                            data?.data.list.map((recipe:Recipe,index:number)=>
                                <ListImage recipe={recipe} index={index}/>
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
export default RecipeList;