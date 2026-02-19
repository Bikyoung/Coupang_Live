export function userCommon() {
    // ------------------------------ AOS init ------------------------------
    AOS.init({
        once: true,
        duration: 700,
        easing: "ease-out"
    });
    
    window.addEventListener('load', () => {
        AOS.refresh();
    });

    // ------------------------------ results ------------------------------
    let resizeTimer;

    //.results__top을 스크롤 중 잠시 고정
    const resultsPinTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".results__top",
            start: "top top",
            end: "bottom top",
            pin: true,
            scrub: 1.5,
            // 애니메이션의 수치(위치, 크기 등)를 Refresh 될 때마다 재계산
            invalidateOnRefresh: true,
        }
    });
    
    // .results__list와 .results__list .image의 크기와 투명도를 한 번에 축소
    resultsPinTimeline
        .set(".results__list", {
            scale: 0.6,
            autoAlpha: 0.3
        })
        .set(".results__list .image", {
            width: 0,
            height: 0
        });
    
    // .results__list들이 스크롤에 맞춰 순차적으로 확대 -> 축소되는 효과
    const resultsAnimationTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".results__bottom",
            start: "top center",
            end: "bottom 40%",
            scrub: 1.5,
            invalidateOnRefresh: true,
        }
    }); 
    
    resultsAnimationTimeline
        .to(".results__title", {
            scale: 0,
            autoAlpha: 0,
            y: 0,
        })
        .to(".results__list--01", {
            scale: 0.8,
            autoAlpha: 1,
            ease: "power2.inOut"
        }, "<")
        .from(".results__list--01 .image", {
            width: 0,
            height: 0,
        }, "<")
        .to(".results__list--01", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__list--01 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__list--02", {
            scale: 0.8,
            autoAlpha: 1
        }, "<")
        .from(".results__list--02 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__list--02", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__list--02 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__list--03", {
            scale: 0.8,
            autoAlpha: 1
        }, "<")
        .from(".results__list--03 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__list--03", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__list--03 .image", {
            width: 0,
            height: 0
        });

    // 리사이즈가 온전히 종료되었을 시에만 ScrollTrigger를 재계산 (Debounce)
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        // 리사이즈 발생 후 0.2초동안 리사이즈가 더 발생하지 않으면 리사이즈가 온전히 종료되었다고 판단 
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();

            ScrollTrigger.getAll().forEach(trigger => {
                trigger.update(); // 현재 스크롤 기준 상태 강제 반영
              });
        }, 200);
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
}

