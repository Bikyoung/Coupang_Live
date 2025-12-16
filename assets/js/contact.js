$(function() {
    // .agreement__check i를 클릭 시, 체크 상태 toggle
    $(".agreement__check i").on("click", function() {
        $(this).closest(".agreement__check").toggleClass("check");
    });

    // $("form").on("submit", function() {
    //     preventDefault();
        
    //     if(!$("#category").validity.valid) {

    //     }
    // });
});

// 유효성 메시지 팝업 등장
// Form.addEventListener("submit", (event) => {
//     Body.style.overflow = "hidden";
//     /* preventDefault() 
//        : 해당 이벤트의 기본 동작을 막는 함수
//          submit의 기본 동작은 1.유효성 검사 2.유효성 에러 메시지 3. 제출(페이지 새로고침)인데,
//          form 태그에 명시된 novalidate로 인해 1,2이 생략되어 바로 form 제출을 하게 됨
//          하지만 JS에서 유효성 검사를 하려면 바로 제출되는 것을 방지해야 하므로 preventDefault()를 호출함 */
//     event.preventDefault();

//     if (!InputUserName.validity.valid) {
//         showPopUp("이름은 필수 항목입니다.");
//     } else if (!InputPhoneNumber.validity.valid) {
//         // 연락처를 입력하지 않은 경우
//         if (InputPhoneNumber.validity.valueMissing) {
//             showPopUp("연락처는 필수 항목입니다.");
//         }
//         // 입력 형식이 맞지 않은 경우
//         else if (InputPhoneNumber.validity.patternMismatch) {
//             showPopUp("연락처는 '-' 없이 숫자 11자리만 입력해야 합니다.\n(예: 01012345678)");
//         }
//     } else if (!InputContent.validity.valid) {
//         showPopUp("문의 내용은 필수 항목입니다.");
//     } else if (!InputPrivacyCheck.validity.valid) {
//         showPopUp("본 동의는 서비스 이용을 위해 필수입니다.");
//     } else {
//         showPopUp("문의가 접수되었습니다.\n담당자가 확인 후 순차적으로 답변드릴 예정입니다.");
//     }
// });