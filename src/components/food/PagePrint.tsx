import {FC} from "react";

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

interface PagePrintProps {
    data: FoodListProps;
    setCurpage: (page:number) => void;
}

const PagePrint:FC<PagePrintProps>=({data,setCurpage})=>{
    const {curpage,totalpage,startPage , endPage}=data

    const pageArr=[]

    // 이벤트 함수 => 익명의 함수
    // setXxx() => retry (재호출)
    // 같은 키를 가지고 있는 경우에는 메모리에 저장된 데이터를 출력 => cache
    const prev=():void =>setCurpage(startPage-1)
    const next=():void =>setCurpage(endPage+1)
    const pageChange=(page:number):void=>setCurpage(page)

    if(startPage>1)
    {
        pageArr.push(
            <li className={"page-item"}>
                <a className={"page-link nav-link"} onClick={prev}>&lt;</a>
            </li>
        )
    }

    for(let i:number=startPage;i<=endPage;i++)
    {
        pageArr.push(
            <li className={i===curpage?"active page-item":"page-item"}>
                <a className={"page-link nav-link"} onClick={()=>pageChange(i)}>{i}</a>
            </li>
        )
    }

    if(endPage<totalpage)
    {
        pageArr.push(
            <li className={"page-item"}>
                <a className={"page-link nav-link"} onClick={next}>&gt;</a>
            </li>
        )
    }
    return (
        <ul className={"pagination"}>
            {pageArr}
        </ul>
    )
}

export default PagePrint;