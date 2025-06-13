import {useState,useEffect,Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons";
// 서버에서 전송된 데이터를 모아서 => 데이터형을 제작 => type BoardItem{} => 구조체
interface BoardItem {
    no: number;
    subject: string;
    name: string;
    dbday:string;
    hit:number;
}
interface BoardListResponse {
    list: BoardItem[];
    today: string;
    curpage:number;
    totalpage:number;
}
function BoardList(){
    const [curpage, setCurpage] = useState<number>(1);
    // 데이터형을 지정 => 가독성
    const {isLoading,isError,error,data,refetch:hitIncrement}=useQuery<{data:BoardListResponse}>({
        queryKey:["board-list",curpage],
        queryFn:async()=>await apiClient.get(`/board/list/${curpage}`)
    })

    // 조회수 증가 => 재호출
    useEffect(() => {
        hitIncrement();
    }, [curpage]);
    // 페이지 변경시마다 한번 재호출

    if(isLoading)
        return <h3>서버에서 데이터 전송 지연</h3>
    if(isError)
        return <h3>서버 에러 발생 : {`${error}`}</h3>



    const prev=()=> setCurpage(curpage>1?curpage-1:curpage)
    const next=()=> setCurpage(data?.data && curpage<data.data.totalpage?curpage+1:curpage)



    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>TanStackQuery+TypeScript를 활용한 게시판</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">

                        <table className="table">
                            <tbody>
                            <tr>
                                <td>
                                    <Link to={"/board/insert"} className="btn btn-outline-success">새글</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"text-center"}>번호</th>
                                <th className={"text-center"}>제목</th>
                                <th className={"text-center"}>이름</th>
                                <th className={"text-center"}>작성일</th>
                                <th className={"text-center"}>조회수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.data.list.map((board:BoardItem) => (
                                    <tr>
                                        <td className={"text-center"}>{board.no}</td>
                                        <td><Link to={"/board/detail/"+board.no}>{board.subject}</Link>
                                            {
                                                board.dbday === data.data.today &&
                                                <sup style={{color:'red'}}>new</sup>
                                            }
                                        </td>
                                        <td className={"text-center"}>{board.name}</td>
                                        <td className={"text-center"}>{board.dbday}</td>
                                        <td className={"text-center"}>{board.hit}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={5} className={"text-center"}>
                                    <button className={"btn btn-outline-secondary"} onClick={prev}>이전</button>
                                    {data?.data.curpage} page / {data?.data.totalpage} pages
                                    <button className={"btn btn-outline-secondary"} onClick={next}>다음</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BoardList;