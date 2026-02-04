import { userCommon } from "./userCommon.js";

let isLoad = false; // 페이지 내 모든 리소스가 로드되었는지 여부 
let isInit = false; // common.js의 init() 실행 완료 여부


window.addEventListener("load", () => {
    isLoad = true;
    creator();
})

window.addEventListener("commonInitDone", () => {
    isInit = true;
    creator();
});

function creator() {
    if(isLoad && isInit) {
        const resultsListImage = ["10rem", "10rem", "8rem"];
    
        userCommon(resultsListImage);
        ScrollTrigger.refresh();
    }
}
