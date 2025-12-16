// ------------------------------ hero ------------------------------
const marquee = document.querySelector(".marquee");
const marqueeTrack = document.querySelector(".marquee__track");

// 페이지 내 모든 리소스가 로드되면 실행
window.addEventListener("load", () => {
    const fadeInHeroTimeline = gsap.timeline();

    // .hero__title이 첫번째로 fade-in
    fadeInHeroTimeline.fromTo(".hero__title", 
        { scale: 0.7, autoAlpha: 0 }, 
        { scale: 1, autoAlpha: 1, duration: 1.2, ease: "ease" })
    // .hero__cta가 두번째로 fade-in 
    .fromTo(".hero__cta", 
        { scale: 0.7, autoAlpha: 0} , 
        { scale: 1, autoAlpha: 1, duration: 0.5, ease: "ease" })
    // .marquee가 세번째로 fade-in
    .fromTo(".marquee", 
        { autoAlpha: 0 }, 
        { autoAlpha: 1 })
    // .marquee의 fade-in과 0.2초 겹치며 tiltAnimation 실행
    .add(() => {
        marquee.style.animation = "tiltAnimation 1.8s forwards"; 
    }, "<0.2")
    // .marquee__track에 marqueeAnimation 실행
    .add(() => {
        marqueeTrack.style.animation = "marqueeAnimation 30s linear infinite";
    });
});

// ------------------------------ vision ------------------------------ 
// .vision__title이 스크롤에 맞춰 아래에서 올라오며 fade-in
const fadeInVisionTitle = gsap.from(".vision__title", {
    y: "150%",
    autoAlpha: 0,
    scrollTrigger: {
        trigger: ".vision__top",
        start: "top 30%",
        end: "+=40%",
        scrub: 2
    }
});

// .vision__top을 스크롤 중 잠시 고정
ScrollTrigger.create({
    trigger: ".vision__top",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: 1
});

// .vision__title이 스크롤에 맞춰 fade-out
const fadeOutVisionTitle = gsap.to(".vision__title", {
    // height: 0,
    scale: 0,
    autoAlpha: 0,
    immediateRender: false,
    scrollTrigger: {
        trigger: ".vision__middle",
        start: "top 60%",
        end: "bottom 20%",
        scrub: 1.5,
    }
});



// ------------------------------ difference ------------------------------ 
const differenceItems = document.querySelector(".difference__items");

// 해상도의 너비가 1023px 이하일 때, .difference__Items의 height를 설정하는 함수
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
        scrub: 1    
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
    if(window.matchMedia("(max-width: 1023px)").matches) {
        exploreContents.style.height = `${2* exploreSeller.offsetHeight}px`;
    }
}

// .explore__seller와 .explore__creator가 반응형에 따라 스크롤에 맞춰 translate 되는 timeline
ScrollTrigger.matchMedia({

    "(min-width: 1024px)" : function() {
        const exploreTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".explore",
                start: "12% top",
                end: "+=600",
                ease: "power2.inOut",
                toggleActions: "play none none reset"
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
                ease: "power2.inOut",
                toggleActions: "play none none reset"
            }
        });

        exploreTimeline.from(".explore__creator", { y: "10%"});
    }
});

// ------------------------------ review ------------------------------
let reviewSwiper = new Swiper(".reviewSwiper", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    breakpoints: {
        480: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        },

        640: {
            slidesPerView: 1.5,
            spaceBetween: 30,
        },

        768: {
            slidesPerView: 1.5,
            spaceBetween: 60,
        },

        800: {
            slidesPerView: 1.5,
            spaceBetween: 80,
        },

        960: {
            slidesPerView: 2,
            spaceBetween: 40,
        },

        1024: {
            slidesPerView: 2,
            spaceBetween: 50,
        },

        1280: {
            slidesPerView: 2.5,
            spaceBetween: 36,
        },

        1440: {
            slidesPerView: 3,
            spaceBetween: 115,
        }
    }
  });

// .reviewSwiper__slide-play 클릭 시 #reviewModal 열림
const reviewPlayBtns = document.querySelectorAll(".reviewSwiper__slide-play");
const youtubePlayer = document.querySelector("#youtubePlayer");
const reviewModalEl = document.querySelector("#reviewModal");
const reviewModal = new bootstrap.Modal(reviewModalEl);

reviewPlayBtns.forEach((reviewPlayBtn) => {
    reviewPlayBtn.addEventListener("click", () => {
        let youtubeSrc = reviewPlayBtn.dataset.youtubeSrc;

        youtubePlayer.setAttribute("src", youtubeSrc);
        reviewModal.show();
    });
});












// 페이지 첫 로드 시 실행
setHeightDifferenceItems();
setHeightExploreContents();

// 화면 해상도가 변경될 때 .difference__item과 .explore__contents의 height를 재계산
window.addEventListener("resize", () => {
    setHeightDifferenceItems();
    setHeightExploreContents();
});







