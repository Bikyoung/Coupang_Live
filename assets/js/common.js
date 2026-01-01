import { loadComponent } from "./componentLoader.js";

async function init() {
    try {
        // header와 footer 로드 및 UI 설정  
        let pageName = document.querySelector("body").dataset.page;

        await loadComponent("header");
        await loadComponent("m-nav");
        await loadComponent("footer");
    
        const header = document.querySelector("header");
        const menuList = document.querySelectorAll("header nav a");

        applyHeaderStyle(pageName, header, menuList);
        setAriaCurrent(pageName, menuList);
        toggleMobileMenu();

        // GSAP 설정
        if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
            
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 2,
                effects: true,
                // 브라우저의 불안정한 스크롤 떨림 현상을 줄여줌
                normalizeScroll: true
            });
        }

        
    } catch(error) {
        console.error("header와 footer 로드 실패", error);
    }
}

// 페이지별 header의 스타일을 다르게 적용
function applyHeaderStyle(pageName, header, menuList) {
    if((pageName === "faq") || (pageName === "contact")) {
        header.style.borderColor = "#C0C0C0";
        menuList.forEach((menu) => {
            menu.style.color = "#000715"
        });
    }
}

// header nav a에 웹 접근성 준수
function setAriaCurrent(pageName, menuList) {
    menuList.forEach((menu) => {
        if(menu.dataset.menu === pageName) {
            menu.setAttribute("aria-current", "page");
            menu.style.color = "#F7552F";
        }
    })
}

// .m-nav에 show 클래스 토글
function toggleMobileMenu() {
    const menuBtns = document.querySelectorAll(".menu-toggle");
    const mobileMenu = document.querySelector(".m-nav");

    menuBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
        })
    });
}

init();


    






