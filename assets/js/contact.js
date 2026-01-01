$(function() {
    // .agreement__check i를 클릭 시, 체크 상태 toggle
    $(".agreement__check i").on("click", function() {
        $(this).closest(".agreement__check").toggleClass("check");
    });
});
