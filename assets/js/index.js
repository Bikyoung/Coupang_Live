gsap.registerPlugin(ScrollTrigger);

let visionAnimation = gsap.timeline({
    scrollTrigger: {
        trigger: ".vision__container--top",
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: true
    }
});

visionAnimation.to(".vision__title", {
    color: "#4E4E4E",
    scale: 0 
}, 0);

visionAnimation.to(".vision__container--bottom", {
    top: "20%"
}, 0.2);

