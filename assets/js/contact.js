import { commonInit } from "./common.js";

async function contactInit() {
    const contactForm = document.querySelector(".contact__form");
    const inputList = document.querySelectorAll(".input");
    let gsapMatchMedia = gsap.matchMedia();
    let isSubmitted = false;    // 페이지 로드 이후 폼이 제출된 적 있었는지 여부를 저장

    await commonInit();

    // 화면 너비가 1441px 이상일 때, .contact__title-wrapper에 pin 기능 적용
    gsapMatchMedia.add("(min-width: 1441px)", () => {
        ScrollTrigger.create({
            trigger: ".contact__title-wrapper",
            start: "top 20%",
            end: "bottom 35%",
            pin: true
        });
    });

    contactForm.addEventListener("submit", (e) => {
        let firstErrorInput = null;    // 첫번째 에러 입력 요소를 저장

        isSubmitted = true;
        /* 브라우저가 서버에 데이터를 전송하고 새로고침 하는 것을 방지
           JS에서 커스텀 에러 메시지를 보여주거나 브라우저의 부족한 유효성 검사를 JS가 보완할 수 있도록 통제권을 확보 */
        e.preventDefault();
 
        // 유효성 검사 결과에 따른 첫번째 에러 입력 요소 포커싱 또는 폼 제출 처리
        inputList.forEach(input => {
            validate(input);

            if(!input.validity.valid && !firstErrorInput) {
                firstErrorInput = input;
            }
        });

        firstErrorInput ? firstErrorInput.focus() : contactForm.submit();
    });

    /* 최초 폼 제출 이후부터 모든 입력 요소에 실시간으로 유효성 검사에 따른 UI 업데이트 수행
       이벤트 위임을 활용 */
    ["input", "change", "focusout"].forEach(eventType => {
        contactForm.addEventListener(eventType, (e) => {
            const targetInput = e.target.closest(".input");

            if(isSubmitted && targetInput) {
                validate(targetInput);
            }
        });
    });
}

// 브라우저의 유효성 검사에 따른 UI 업데이트 함수
function validate(input) {
    const errorMessageTag = input.parentElement.querySelector(".error-message");
    let errorMessage = "";

    if(input.validity.valueMissing || input.value.trim() ==="") {
        const action = input.dataset.action;
        errorMessage = `필수 ${action} 항목입니다`;
    } else if(input.validity.patternMismatch) {
        const format = input.dataset.format;
        errorMessage = `${format} 형식이 올바르지 않습니다`;
    }

    errorMessageTag.textContent = errorMessage;
    input.style.borderColor = errorMessage ? "#FF0000" : "#C0C0C0";
}

contactInit();