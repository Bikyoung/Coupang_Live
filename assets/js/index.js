// ------------------------------ vision ------------------------------ 
// .vision__title이 스크롤에 맞춰 아래에서 올라오며 fade-in
const fadeInVisionTitle = gsap.from(".vision__title", {
    y: "100%",
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".vision__top",
        start: "top 30%",
        end: "+=30%",
        scrub: 2.5
    }
});

// .vision__top을 스크롤 중 잠시 고정
ScrollTrigger.create({
    trigger: ".vision__top",
    start: "10% top",
    end: "+=1000",
    pin: true,
    anticipatePin: 1,
});

// .vision__title이 스크롤에 맞춰 fade-out 되는 timeline
const fadeOutVisionTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".vision__middle",
        start: "top 50%",
        end: "+=400",
        scrub: 3
    }
});

fadeOutVisionTimeline.to(".vision__title", {
    scale: 0
}, 0);
fadeOutVisionTimeline.to(".vision__title", {
    autoAlpha: 0
}, 0);

// ------------------------------ difference ------------------------------ 
// .difference__Items의 height를 설정하는 함수
const differenceItems = document.querySelector(".difference__items");

function setHeightDifferenceItems() {
    let paddingTop = "60px";

    if(window.matchMedia("(max-width: 1023px) and (min-width: 768px)").matches) {
        paddingTop = "50px";
    } else if(window.matchMedia("(max-width: 767px)").matches) {
        paddingTop = "40px";
    }

    differenceItems.style.height = `calc(100vh - 2 * ${paddingTop})`;
}
  
// .difference__item들이 스크롤에 맞춰 순차적으로 보여지는 timeline
const differenceTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".difference__contents",
        start: "top top",
        endTrigger: ".difference__item--03",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        markers: true,
    }
});

differenceTimeline
    .to({}, { duration: 0.2})   // .difference__item--01이 보여지는 시간을 확보
    .set(".difference__item--01", { autoAlpha: 0})
    .set(".difference__item--02", { autoAlpha: 1})

    .to({}, { duration: 0.3})
    .set(".difference__item--02", { autoAlpha: 0})
    .set(".difference__item--03", { autoAlpha: 1})

    // .difference__item--03이 보여짐과 동시에 timeline이 종료되는 것을 방지하여 .difference__item--03이 보여지는 시간을 확보
    .to({}, { duration: 0.3});  

// ------------------------------ explore ------------------------------
const exploreSeller = document.querySelector(".explore__seller");
const exploreContents = document.querySelector(".explore__contents");

// .exploreContents의 height를 설정하는 함수
function setHeightExploreContents() {
    exploreContents.style.height = `${2* exploreSeller.offsetHeight}px`;
}

// .explore__seller와 .explore__creator가 반응형에 따라 스크롤에 맞춰 translate 되는 timeline
ScrollTrigger.matchMedia({

    "(min-width: 1024px)" : function() {
        const exploreTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".explore",
                start: "20% top",
                end: "+=600",
            }
        });
        
        exploreTimeline
            .from(".explore__seller", { x: "-10%" }, 0)
            .from(".explore__creator", { x: "10%" }, 0);
    },

    "(max-width: 1023px)" : function() {
        const exploreTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".explore",
                start: "10% top",
                end: "+=100",
            }
        });

        exploreTimeline.from(".explore__creator", { y: "10%"});
    }
});


// 페이지 첫 로드 시 실행
setHeightDifferenceItems();
setHeightExploreContents();

// 화면 해상도가 변경될 때 .difference__item과 .explore__contents의 height를 재계산
window.addEventListener("resize", () => {
    setHeightDifferenceItems();
    setHeightExploreContents();
});







