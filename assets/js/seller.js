// ------------------------------ results ------------------------------
// .results__top을 스크롤 중 잠시 고정
const resultsPinTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".results__top",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 2
    }
});

// .results__list와 .results__list .image의 크기와 투명도를 한 번에 축소
resultsPinTimeline
    .set(".results__list", {
        scale: 0.6,
        autoAlpha: 0.3
    })
    .set(".results__list .image", {
        height: 0
    });

// .results__list들이 스크롤에 맞춰 순차적으로 확대 -> 축소되는 효과
const resultsAnimationTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".results__lists",
        start: "top 60%",
        // end: "bottom 30%",
        end: "+=800",
        scrub: 2
    }
}); 

resultsAnimationTimeline
    .to(".results__title", {
        scale: 0,
        autoAlpha: 0
    })
    .to(".results__list--01", {
        scale: 0.8,
        autoAlpha: 1
    }, "<")
    .to(".results__list--01 .image", {
        height: "10rem"
    }, "<")
    .to(".results__list--01", {
        scale: 0.6,
        autoAlpha: 0.3
    }, ">+=2")
    .to(".results__list--01 .image", {
        height: 0
    }, "<")
    .to(".results__list--02", {
        scale: 0.8,
        autoAlpha: 1
    }, "<")
    .to(".results__list--02 .image", {
        height: "9rem"
    }, "<")
    .to(".results__list--02", {
        scale: 0.6,
        autoAlpha: 0.3
    }, ">+=2")
    .to(".results__list--02 .image", {
        height: 0
    }, "<")
    .to(".results__list--03", {
        scale: 0.8,
        autoAlpha: 1
    }, "<")
    .to(".results__list--03 .image", {
        height: "10rem"
    }, "<")
    .to(".results__list--03", {
        scale: 0.6,
        autoAlpha: 0.3
    }, ">+=2")
    .to(".results__list--03 .image", {
        height: 0
    });

// ------------------------------ liveType ------------------------------
const liveTypeTabList = document.querySelectorAll(".liveType__tab");
const liveTypeContentList = document.querySelectorAll(".liveType__content");

// 각 .liveType__tab 클릭 시, 적절한 해당 콘텐츠 표시 
liveTypeTabList.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        liveTypeTabList.forEach((t) => {
            t.classList.remove("on");
        });
        tab.classList.add("on");

        liveTypeContentList.forEach((c) => {
            c.classList.remove("on");
        });
        liveTypeContentList[index].classList.add("on");
    });
});