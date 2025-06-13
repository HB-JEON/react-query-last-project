// NodeJS, TypeScript, TanStack-Query
import {Fragment, useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse, AxiosError} from "axios";

// jsx => javascript + xml => createElement
function Header() {
    const nav = useNavigate();
    const [login, setLogin] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const idRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    // sessionStorage
    /*
         서버에서 session저장 안된다
         -------------------------  DB
         세션 저장 : sessionStorage.=setItem("키","값") > 서버로 id,pwd 전송 => 결과값
         세션 해제 : sessionStorage.clear()

         // 댓글

     */
    interface LoginData {
        msg: string;
        id: string;
        name: string;
    }
    // useQuery => 함수명 지정: refetch: 함수명
    const {mutate: loginOK} = useMutation({
        mutationFn: async () => {
            const res: AxiosResponse<LoginData> = await  apiClient.get(`/member/login/${id}/${pwd}`)
            return res.data
        },
        onSuccess: (data) => {
            if(data.msg === 'NOID')
            {
                alert("아이디를 확인 해주세요.")
                setId('');
                setPwd('');
                idRef.current?.focus();
            }
            else if(data.msg === 'NOPWD')
            {
                alert("비밀번호를 확인 해주세요.")
                setPwd('');
                pwdRef.current?.focus();
            }
            else if(data.msg === 'OK')
            {
                // session 저장 => 자바스크립트
                window.sessionStorage.setItem("id", data.id);
                window.sessionStorage.setItem("name", data.name);
                setLogin(true)
                window.location.reload();
            }
        },
        onError: (err: AxiosError) => {
            console.log("Login Err", err.message);
        }
    });
    ////////////////////////////////// 서버 연결
    useEffect(() => {
        if(sessionStorage.getItem("id"))
        {
            setLogin(true)
        }
    }, []);
    const memberLogin = () => {
        if(id.trim() === "")
        {
            idRef.current?.focus();
            return
        }
        if(pwd.trim() === "")
        {
            pwdRef.current?.focus();
            return
        }
        loginOK()
    }
    const memberLogout = () => {
        window.sessionStorage.clear(); // session.invalidate()
        setId('');
        setPwd('');
        setLogin(false);
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">
                            <div className="top_social_bar">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !login?(
                                            <div className="login">
                                                ID:<input type={"text"} size={10} className={"input-sm"}
                                                    onChange={(e: any) => setId(e.target.value)}
                                                    ref={idRef}
                                                    value={id}/>&nbsp;
                                                PW:<input type={"password"} size={10} className={"input-sm"}
                                                          onChange={(e: any) => setPwd(e.target.value)}
                                                          ref={pwdRef}
                                                          value={pwd}/>&nbsp;
                                                <button className={"btn-sm btn-outline-primary"} onClick={memberLogin}>로그인</button>
                                            </div>
                                        ): (
                                            <div className="login">
                                                {window.sessionStorage.getItem("name")}님 로그인 중입니다.&nbsp;
                                                <button className={"btn-sm btn-outline-danger"} onClick={memberLogout}>로그아웃</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="logo_area text-center">
                                <Link to="/" className="yummy-logo">TanStack-Query Project</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="fa fa-bars"
                                                                          aria-hidden="true"></i> Menu
                                </button>
                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">레시피</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to="/recipe/list">레시피 목록</Link>
                                                <Link className="dropdown-item" to="/recipe/find">레시피 검색</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">맛집</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"/food/list"}>맛집 목록</Link>
                                                <Link className="dropdown-item" to={"/info/find"}>맛집 검색</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/youtube/find"}>동영상</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/board/list"}>커뮤니티</Link>
                                        </li>
                                        {
                                            login &&
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/news/list">뉴스</Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header;