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
        end: "+=500",
        scrub: 3
    }
});

fadeOutVisionTimeline.to(".vision__title", {
    scale: 0
}, 0);
fadeOutVisionTimeline.to(".vision__title", {
    autoAlpha: 0
}, 0);





