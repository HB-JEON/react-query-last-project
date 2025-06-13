import {Fragment, useState, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";

interface NewsData {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
}
interface NewsResponse {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: []
}
interface NewsProps {
    data: NewsResponse
}

function NewsList() {
    const [fd, setFd] = useState<string>("맛집");
    const fdRef = useRef<HTMLInputElement>(null);
    const {isLoading, isError, error, data, refetch: newsFind} = useQuery<AxiosResponse, Error>({
        queryKey:['news-list',fd],
        queryFn: async()=> await axios.get('http://localhost:3355/news/list',{
            params:{
                query:fd
            }
        })
    })
    if(isLoading)
        return <div className={"text-center"}>Loading...</div>
    if (isError)
        return <div className={"text-center"}>{`${error}`}</div>
    // const news: NewsData | undefined = data?.data
    const find = () => {
        if(fd === "")
        {
            fdRef.current?.focus()
            return;
        }
        if(fdRef.current)
        {
            setFd(fdRef.current?.value)
        }
        newsFind();
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>네이버 뉴스 검색</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <input type={"text"} className={"input-sm"}
                               size={20} ref={fdRef} value={fd}/>
                        <button className={"btn-sm btn-danger"} onClick={find}>검색</button>
                    </div>
                    <div className="row" style={{"marginTop":"20px"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>
                                    {
                                        data?.data.items &&
                                        data?.data.items.map((n:NewsData)=>
                                            <table className={"table"}>
                                                <tbody>
                                                <tr>
                                                    <td><a href={n.link}><h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html: n.title}}></h3></a></td>
                                                </tr>
                                                <tr>
                                                    <td dangerouslySetInnerHTML={{__html: n.description}}></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        )
                                    }
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

export default NewsList;