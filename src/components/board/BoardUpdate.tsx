import {useParams,useNavigate} from "react-router-dom";
import {useQuery,useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useEffect, useRef, useState,Fragment} from "react";
import {AxiosResponse,AxiosError} from "axios";

// 값을 받아서 => 화면 출력
interface BoardUpdateItem {
    no: number;
    name: string;
    subject:string;
    content: string;
}
// 수정 결과값 : yes/no
interface BoardUpdateResponse {
    msg: string;
}
function BoardUpdate(){
    const {no}= useParams();
    const nav=useNavigate();
    const nameRef=useRef<HTMLInputElement>(null)
    // <input>
    const subjectRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [pwd, setPwd] = useState<string>("")

    const { data } = useQuery({
        queryKey: ['board-update', no],
        queryFn: async () => {
            return apiClient.get<BoardUpdateItem>(`/board/update/${no}`)
        }
    });

    console.log(data)
    const board=data?.data
    console.log(board)

    useEffect(() => {
        if(board)
        {
            setName(board.name)
            setSubject(board.subject)
            setContent(board.content)
        }

    }, [board]);

    // 수정
    // TypeScript => 매개변수의 데이터형 처리
    const {mutate:boardUpdate}=useMutation({
        mutationFn:()=>apiClient.put(`/board/update_ok`,{
            no:no,
            name:name,
            subject:subject,
            content:content,
            pwd:pwd,
        }),
        onSuccess:(res:AxiosResponse<BoardUpdateResponse>)=>{
            console.log(res)
            if(res.data.msg==='yes') {
                window.location.href = `/board/detail/${no}` ;
            }
            else
            {
                alert("비밀번호가 틀립니다")
                setPwd("")
                pwdRef.current?.focus()
            }
        },
        onError:(err:AxiosError)=>{
            console.log(err)
        }
    })
    const boardUpdateOk=()=>{
        if(!name.trim()) // name.trim()===""
            return nameRef.current?.focus()
        if(!subject.trim())
            return subjectRef.current?.focus()
        if(!content.trim())
            return contentRef.current?.focus()
        if(!pwd.trim())
            return pwdRef.current?.focus()
        boardUpdate()
    }
    const cancel=():void=>{
        nav(-1)
    }
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

                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <th className={"text-center"} style={{"width":"15%"}}>이름</th>
                                <td style={{"width":"85%"}}>
                                    <input type={"text"} className={"input-sm"}
                                           size={20}
                                           ref={nameRef}
                                           value={name}
                                           onChange={(e:any):void=>setName(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th className={"text-center"} style={{"width":"15%"}}>제목</th>
                                <td style={{"width":"85%"}}>
                                    <input type={"text"} className={"input-sm"}
                                           size={50}
                                           ref={subjectRef}
                                           value={subject}
                                           onChange={(e:any):void=>setSubject(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th className={"text-center"} style={{"width":"15%"}}>내용</th>
                                <td style={{"width":"85%"}}>
                              <textarea
                                  onChange={(e:any):void=>setContent(e.target.value)}
                                  rows={10} cols={50}
                                  value={content}
                                  ref={contentRef}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th className={"text-center"} style={{"width":"15%"}}>비밀번호</th>
                                <td style={{"width":"85%"}}>
                                    <input type={"password"} className={"input-sm"}
                                           size={10}
                                           ref={pwdRef}
                                           value={pwd}
                                           onChange={(e:any):void=>setPwd(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"}>
                                    <button className={"btn btn-outline-info"} onClick={boardUpdateOk}>수정</button>
                                    <button className={"btn btn-outline-danger"} onClick={cancel}>취소</button>
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
export default BoardUpdate