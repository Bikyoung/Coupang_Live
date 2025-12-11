gsap.registerPlugin("ScrollTrigger, ScrollSmoother");

ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
    // 브라우저의 불안정한 스크롤 떨림 현상을 줄여줌
    normalizeScroll: true
});





