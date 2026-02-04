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

        inputGroup.forEach((input) => {
            const field = input.querySelector("select, input, textarea");

            ["blur", "change", "input"].forEach((eventType) => {
                field.addEventListener(eventType, () => {
                    checkValidation(input);
                });
            });
        });

        form.addEventListener("submit", (e) => {
            let firstInvalidField = null;

            inputGroup.forEach((input) => {
                const isValid = checkValidation(input, e);

                if(!isValid && !firstInvalidField) {
                    firstInvalidField = input.querySelector("select, input, textarea");
                }
            });

            if(firstInvalidField) {
                firstInvalidField.focus();
            }
        });
    }
}

function checkValidation(input, e) {
    const field = input.querySelector("select, input, textarea");
    const errorMessage = input.querySelector(".error-message");
    
    if(field.validity.valueMissing) {
        const errRequired = field.dataset.errRequired || "필수 입력 항목입니다.";

        if(e) {
            e.preventDefault();
        }

        input.classList.add("is-invalid");
        errorMessage.innerText = errRequired;

        return false;

    } else {
        input.classList.remove("is-invalid");
        return true;
    }
}





