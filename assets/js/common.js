import "../styles/base/bundle.scss";
import { loadComponent } from "./componentLoader.js";

export async function commonInit() {
    try {
        await loadComponent("header");
        await loadComponent("m-nav");
        await loadComponent("footer");

        const header = document.querySelector(".header");
        const navLinkList = document.querySelectorAll(".nav__link");
        const currentPage = document.querySelector("body").dataset.page;
        
        // 문의하기 페이지는 .floating-btn 로드 제외 
        if(currentPage !== "contact") {
            await loadComponent("floating-btn");
        }
    
        setAriaCurrent(navLinkList, currentPage);
        applyHeaderStyle(header, currentPage);
        toggleMNav();
        
        // GSAP 설정
        if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            if(currentPage !== "creator" && currentPage !== "seller") {
                gsap.registerPlugin(ScrollSmoother);

                ScrollSmoother.create({
                    wrapper: "#smooth-wrapper",
                    content: "#smooth-content",
                    smooth: 2,
                    effects: true,
                    // 브라우저의 불안정한 스크롤 떨림 현상을 줄여줌
                    normalizeScroll: true
                });
            }
        }
    } catch(error) {
        console.error("header와 footer 로드 실패", error);
    }
}

// .header-nav__menu에 aria-current="page" 설정
function setAriaCurrent(navLinkList, currentPage) {
    navLinkList.forEach(link => {
        if(link.dataset.menu === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });
}

// 페이지별 header의 스타일을 다르게 적용
function applyHeaderStyle(header, currentPage) {
    if((currentPage === "faq") || (currentPage === "contact")) {
        header.classList.add("header--dark");
    }
}

// .m-nav에 show 클래스 및 aria-expanded 토글
function toggleMNav() {
    const menuToggleList = document.querySelectorAll(".menu-toggle");
    const mNav = document.querySelector(".m-nav");
    const mNavOpener = document.querySelector(".header__hamburger");

    menuToggleList.forEach(menuToggle => {
        menuToggle.addEventListener("click", () => {
            let isOpen;

            mNav.classList.toggle("show");
            isOpen = mNav.classList.contains("show");

            mNavOpener.setAttribute("aria-expanded", String(isOpen));
        });
    });
}




    






