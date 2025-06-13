import {useNavigate,useParams} from "react-router-dom";
import {Fragment} from "react";
import apiClient from "../../http-commons";
import {useQuery} from "@tanstack/react-query";
interface RecipeDetailData {
    no:number;
    likecount:number;
    poster:string;
    title:string;
    chef:string;
    chef_poster:string;
    chef_profile:string;
    info1:string;
    info2:string;
    info3:string;
    content:string;
    foodmake:string;
    data:string;
}
interface RecipeDetailResponse {
    vo:RecipeDetailData;
    mList:[];
    iList:[];
    dList:[]
}
interface RealResponse {
    data:RecipeDetailResponse;
}
function RecipeDetail() {
    const {no}=useParams();
    const nav = useNavigate();
    const {isLoading,isError,error,data} = useQuery<RealResponse,Error>({
        queryKey:["recipe-detail",no],
        queryFn:async ()=> await apiClient(`/recipe/detail/${no}`)
    });
    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    const recipe=data?.data
    console.log(recipe?.vo)
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>레시피 상세보기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td colSpan={3} className={"text-center"}>
                                    <img src={recipe?.vo.poster} alt={""} style={{"width":"800px","height":"250px"}} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className={"text-center"}>
                                    <h3>{recipe?.vo.title}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className={"text-center"}>
                                    {recipe?.vo.content}
                                </td>
                            </tr>
                            <tr>
                                <td className={"text-center"}><img src={"/icon/a1.png"} alt={""}/></td>
                                <td className={"text-center"}><img src={"/icon/a2.png"} alt={""}/></td>
                                <td className={"text-center"}><img src={"/icon/a3.png"} alt={""}/></td>
                            </tr>
                            <tr>
                                <td className={"text-center"}>{recipe?.vo.info1}</td>
                                <td className={"text-center"}>{recipe?.vo.info2}</td>
                                <td className={"text-center"}>{recipe?.vo.info3}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td><h3>[재료]</h3></td>
                            </tr>
                            <tr>
                                <td>
                                    <ul>
                                        {
                                            recipe &&
                                            recipe?.dList.map((datas:string) => (
                                                <li>{datas}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td><h3>[조리순서]</h3></td>
                            </tr>
                            <tr>
                                <td>
                                    {
                                        recipe &&
                                        recipe?.mList.map((fm:string,index:number) =>
                                            <table className={"table"}>
                                                <tbody>
                                                <tr>
                                                    <td className={"text-left"} width={"80%"}>
                                                        {fm}
                                                    </td>
                                                    <td className={"text-right"} width={"20%"}>
                                                        <img src={recipe.iList[index]} alt={""} style={{"width":"100px","height":"80px"}}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        )
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tr>
                                <td colSpan={2}><h3>레시피 작성자</h3></td>
                            </tr>
                            <tr>
                                <td width={"30%"} className={"text-center"}>
                                    <img src={recipe?.vo.chef_poster} alt={""} style={{"width":"100px","height":"80px"}}/>
                                </td>
                                <td width={"70%"}>
                                    <h3>{recipe?.vo.chef}</h3><br/>
                                    {recipe?.vo.chef_profile}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-right"}>
                                    <button className={"btn-sm btn-danger"}
                                            onClick={()=>nav(-1)}
                                    >목록</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default RecipeDetail;