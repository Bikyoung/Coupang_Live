import "../styles/pages/userCommon.scss";
import "../styles/pages/seller.scss";
import { commonInit } from "./common.js";
import { userCommon } from "./userCommon.js";

async function seller() {
    await commonInit();

    // 트리거 중복으로 인한 오작동을 방지하기 위해 기존의 트리거 인스턴스를 모두 제거
    ScrollTrigger.getAll().forEach((trigger) => { trigger.kill(); });

    userCommon();
    ScrollTrigger.refresh();

    /* 브라우저가 이미지를 로드 완료한 시점과 이미지 랜더링이 실제 완료된 시점이 달라
        트리거 계산이 오작동하는 것을 방지하기 위해 시간 확보 후 재계산 */
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}

seller();