import {Fragment} from "react";
/*
    const Footer = () => {
        익명의 함수 형태
    }
*/
function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="copy_right_text text-center">
                            <p>2025 마지막 개인 프로젝트 예제(React-Query)<i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">D 강의장</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;