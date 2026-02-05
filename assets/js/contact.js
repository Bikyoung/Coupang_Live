let isLoad = false; // 페이지 내 모든 리소스가 로드되었는지 여부 
let isInit = false; // common.js의 init() 실행 완료 여부

window.addEventListener("load", () => {
    isLoad = true;
    init();
})

window.addEventListener("commonInitDone", () => {
    isInit = true;
    init();
});

function init() {

    if(isLoad && isInit) {

        const form = document.querySelector("form");
        const inputGroup = document.querySelectorAll(".input-group"); 
        const checkBox = document.querySelector("#agreement__checkbox");
        const checkBoxIcon = document.querySelector(".fa-square-check");

        let gsapMatchMedia = gsap.matchMedia();

        // .agreement__check i를 클릭 시, 체크 상태 toggle
        checkBox.addEventListener("change", function() {
            checkBoxIcon.classList.toggle("check");
        });

        // 화면 너비가 1441px 이상일 때, .container__left에 pin 기능 적용
        gsapMatchMedia.add("(min-width: 1441px)", () => {
            ScrollTrigger.create({
                trigger: ".container__left",
                start: "top top",
                end: "bottom 35%",
                pin: true,
            });
        });

        /* 폼 입력 요소에 blur, change, input 이벤트 발생 시, 
           해당 요소에 실시간 유효성 검사를 수행 
           (폼 재출 시 수행하는 유효성 검사와는 별도) */
        inputGroup.forEach((input) => {
            const field = input.querySelector("select, input, textarea");

            ["blur", "change", "input"].forEach((eventType) => {
                field.addEventListener(eventType, () => {
                    checkValidation(input);
                });
            });
        });

        /* 폼에 submit 이벤트 발생 시, 유효성을 검사하여 유효하지 않은 첫번째 요소를 포커스 함
           모든 폼 입력 요소가 유효할 시, 폼 제출 */
        form.addEventListener("submit", (e) => {
            let firstInvalidField = null;

            e.preventDefault();

            inputGroup.forEach((input) => {
                const isValid = checkValidation(input);

                if(!isValid && !firstInvalidField) {
                    firstInvalidField = input.querySelector("select, input, textarea");
                }
            });
            
            if(firstInvalidField) {
                firstInvalidField.focus();
            } else {
                form.submit();
            }
        });
    }
}

// 폼 입력 요소의 유효성 검사 함수
function checkValidation(input) {
    const field = input.querySelector("select, input, textarea");
    const errorMessage = input.querySelector(".error-message");
    
    if(field.validity.valueMissing) {
        const errRequired = field.dataset.errRequired || "필수 입력 항목입니다.";

        input.classList.add("is-invalid");
        errorMessage.innerText = errRequired;

        return false;

    } else {
        input.classList.remove("is-invalid");
        return true;
    }
}





