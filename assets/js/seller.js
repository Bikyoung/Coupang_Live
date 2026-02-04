import { userCommon } from "./userCommon.js";

let isLoad = false; // 페이지 내 모든 리소스가 로드되었는지 여부 
let isInit = false; // common.js의 init() 실행 완료 여부


window.addEventListener("load", () => {
    isLoad = true;
    seller();
})

window.addEventListener("commonInitDone", () => {
    isInit = true;
    seller();
});

function seller() {
    if(isLoad && isInit) {
        const resultsListImage = ["11rem", "11rem", "12rem"];
    
        userCommon(resultsListImage);
        ScrollTrigger.refresh();
    }
}