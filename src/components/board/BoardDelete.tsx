import {useNavigate,useParams} from "react-router-dom";
import {useState,useRef,Fragment} from "react";
import apiClient from "../../http-commons";
import {useMutation} from "@tanstack/react-query";
import {AxiosResponse,AxiosError} from "axios";

// 서버에서 들어오는 값을 받는 변수 => yes / no
interface DeleteResponse{
    msg:string
}

function BoardDelete(){
    const {no}=useParams<{no:string}>();
    const nav=useNavigate();
    const pwdRef=useRef<HTMLInputElement>(null)
    const [pwd,setPwd] = useState<string>("");
    // 데이터 전송 (삭제 요청)
    const {mutate:boardDelete} = useMutation({
        mutationFn:async()=>{
            return await apiClient.delete(`/board/delete/${no}/${pwd}`)
        },
        onSuccess:(res)=>{
            if(res.data.msg==='yes')
            {
                window.location.href='/board/list'
            }
            else
            {
                alert("비밀번호가 틀립니다")
                setPwd("")
                pwdRef.current?.focus()
            }
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    // 삭제 버튼 클릭시
    const boardDeleteOk=():void=>{
        if(!pwd.trim())
        {
            pwdRef.current?.focus()
            return
        }
        boardDelete()
    }
    // 취소 버튼 클릭
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
                    <div className={"row"} style={{"width":"350px"}}>

                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    비밀번호 : <input type={"password"} size={20} className={"input-sm"}
                                                  ref={pwdRef}
                                                  onChange={(e)=>setPwd(e.target.value)}
                                                  value={pwd}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td className={"text-center"}>
                                    <button className={"btn btn-danger"} onClick={boardDeleteOk}>삭제</button>
                                    <button className={"btn btn-warning"} onClick={cancel}>취소</button>
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
export default BoardDelete