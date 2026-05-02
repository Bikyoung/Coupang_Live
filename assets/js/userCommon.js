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

    // //.results__title을 스크롤 중 잠시 고정
    const resultsPinTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".results__title",
            start: "top top",
            end: "bottom top",
            pin: true,
            scrub: 1.5,
            // 애니메이션의 수치(위치, 크기 등)를 Refresh 될 때마다 재계산
            invalidateOnRefresh: true,
        }
    });

    // .results__item와 .results__item .image의 크기와 투명도를 한 번에 축소
    resultsPinTimeline
        .set(".results__item", {
            scale: 0.6,
            autoAlpha: 0.3
        })
        .set(".results__item .image", {
            width: 0,
            height: 0
        });
    
    // .results__item들이 스크롤에 맞춰 순차적으로 확대 -> 축소되는 효과
    const resultsAnimationTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".results__list",
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
        .to(".results__item-01", {
            scale: 0.8,
            autoAlpha: 1,
            ease: "power2.inOut"
        }, "<")
        .from(".results__item-01 .image", {
            width: 0,
            height: 0,
        }, "<")
        .to(".results__item-01", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__item-01 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__item-02", {
            scale: 0.8,
            autoAlpha: 1
        }, "<")
        .from(".results__item-02 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__item-02", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__item-02 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__item-03", {
            scale: 0.8,
            autoAlpha: 1
        }, "<")
        .from(".results__item-03 .image", {
            width: 0,
            height: 0
        }, "<")
        .to(".results__item-03", {
            scale: 0.6,
            autoAlpha: 0.3
        }, ">+=2")
        .to(".results__item-03 .image", {
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
    // const liveTypeTabList = document.querySelectorAll(".liveType__tab");
    const liveTypeTabList = document.querySelector(".liveType__tabList");
    const liveTypeTabs = document.querySelectorAll(".liveType__tab");
    const liveTypeContents = document.querySelectorAll(".liveType__content");

    // 이벤트 위임을 통해 각 .liveType__tab 클릭 시, 연결된 콘텐츠를 표시 
    liveTypeTabList.addEventListener("click", (e) => {
        const targetTab = e.target.closest(".liveType__tab");
        if(!targetTab) return;    // 빈 영역 클릭 시 에러 방지

        const targetTabPanelID = targetTab.getAttribute("aria-controls");
        const targetTabPanel = document.getElementById(targetTabPanelID);
        
        liveTypeTabs.forEach(tab => {
            tab.setAttribute("aria-selected", (tab === targetTab ? "true" : "false"));
            tab.setAttribute("tabindex", (tab === targetTab ? "0" : "-1"));
        });

        liveTypeContents.forEach(tabPanel => {
            tabPanel.hidden = (tabPanel === targetTabPanel ? false : true);
            tabPanel.setAttribute("tabindex", tabPanel === targetTabPanel ? "0" : "-1");
        });
    });
}

