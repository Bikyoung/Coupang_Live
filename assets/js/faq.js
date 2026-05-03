import "../styles/pages/faq.scss";
import { commonInit } from "./common.js";

const faqTitle = document.querySelector(".faq__title");
const faqPaginationTag = document.querySelector(".faq__pagination");
const faqTabList = document.querySelector(".faq__tabList");
const faqTabArr = [...document.querySelectorAll(".faq__tab")];
const faqInput = document.querySelector(".faq__input");
const faqTabPanel = document.querySelector("#tabpanel-faq");
const searchBtn = document.querySelector(".button__submit");
const resetBtn = document.querySelector(".button__reset");

let allFaqArr = [];
let filterFaqArr = null;
let currentPage = 1;
let lastPage = null;
let pageNumBtnList = null;
let pagePrevBtn = null;
let pageNextBtn = null;

// faq.html 첫 로드 시 실행할 초기화 함수
async function faqInit() {
    await commonInit();

    faqTabArr.forEach((faqTab) => {
        faqTab.disabled = true;
    });

    await getFaq();
    filterFaqArr = allFaqArr;

    renderPagination();
    renderFaq(sliceFaq());

    pageNumBtnList = document.querySelectorAll(".page-num-btn");
    pagePrevBtn = document.querySelector(".page-prev-btn");
    pageNextBtn = document.querySelector(".page-next-btn");

    // 이벤트 리스너 등록

    const handlePageChange = (condition) => {
        pageNumBtnList = document.querySelectorAll(".page-num-btn");
        pagePrevBtn = document.querySelector(".page-prev-btn");
        pageNextBtn = document.querySelector(".page-next-btn");

        renderFaq(sliceFaq());

        pageNumBtnList.forEach(btn => {
            condition(btn)
            ? btn.setAttribute("aria-current", "page") 
            : btn.removeAttribute("aria-current");
        });

        currentPage === 1 
        ? pagePrevBtn.setAttribute("disabled", "true")
        : pagePrevBtn.removeAttribute("disabled");
        
        currentPage === lastPage 
        ? pageNextBtn.setAttribute("disabled", "true")
        : pageNextBtn.removeAttribute("disabled");

        // 화면 상단으로 이동
        faqTitle.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };
    
    // 해당 페이지 번호에 맞는 faq 데이터를 렌더링하는 클릭 이벤트를 페이지네이션에 등록
    faqPaginationTag.addEventListener("click", (e) => {
        const numTarget = e.target.closest(".page-num-btn");
        const prevTarget = e.target.closest(".page-prev-btn");
        const nextTarget = e.target.closest(".page-next-btn");

        // 페이지 번호 버튼 클릭 시
        if(numTarget) {
            currentPage = Number(numTarget.dataset.num);
            handlePageChange(btn => btn === numTarget);
        } 
        // 이전 페이지 버튼 클릭 시
        else if(prevTarget) {
            currentPage -= 1;
            handlePageChange(btn => Number(btn.dataset.num) === currentPage);    
        } 
        // 다음 페이지 버튼 클릭 시
        else if(nextTarget) {
            currentPage += 1;
            handlePageChange(btn => Number(btn.dataset.num) === currentPage);
        } 
        // 유효하지 않은 영역 클릭 시
        else {
            return;
        }        
    });

    faqTabArr.forEach(tab => tab.removeAttribute("disabled"));
    
    // 카테고리 탭 버튼 클릭 시 필터링 및 렌더링을 수행하는 이벤트 등록
    faqTabList.addEventListener("click", (e) => {
        const tabTarget = e.target.closest(".faq__tab");
        if (!tabTarget) return;

        const tabTargetId = tabTarget.getAttribute("id");
        const tabTargetValue = tabTarget.textContent;

        // 모든 .faq__tab을 선택 해제하고, 클릭한 탭만 선택 상태로 변경
        faqTabArr.forEach(tab => tab.setAttribute("aria-selected", tab === tabTarget ? "true" : "false"));
        faqTabPanel.setAttribute("aria-labelledby", tabTargetId);
        
        // 각 .faq__tab에 데이터 필터링 및 렌더링을 수행하는 클릭 이벤트 등록
        faqInput.value="";
        toggleSearchIcon();
        filterFaq(tabTargetValue);
    });

    // .faq__input에 검색어 입력을 통한 필터링 및 렌더링을 수행하는 이벤트 등록
    faqInput.addEventListener("input", function() {
        currentPage = 1;
        toggleSearchIcon();

        // 검색 효율 극대화를 위해 텍스트 내 모든 공백(스페이스, 탭, 줄바꿈)을 제거한 후 비교
        const inputText = this.value.replace(/\s/g, "");

        // .faq__input에 입력된 텍스트가 지워졌을 때 현 카테고리에 해당하는 faqs의 전 객체들을 화면에 렌더링
        if(inputText === "") {
            renderPagination();
            renderFaq(sliceFaq());
        } else {
            const res = filterFaqArr.filter(el =>
                el.question.replace(/\s/g, "").includes(inputText));

            if(res.length === 0) {
                faqTabPanel.innerHTML = `<p class="no-result">검색 결과가 없습니다</p>`;
                return;
            }

            renderPagination(res);
            renderFaq(sliceFaq(res));
        }
    });

    resetBtn.addEventListener("click", () => {
        faqInput.value = null;
        currentPage = 1;

        toggleSearchIcon();
        renderPagination();
        renderFaq(sliceFaq());    
    });
}

// faq.json 파일을 faq.js 파일에 연결하고 읽어와서 faqs 배열을 전역변수 faqList에 할당하는 비동기 함수
async function getFaq() {
    try {
        const res = await fetch("/data/faq.json");

        if(res.ok) {
            const data = await res.json();
            allFaqArr = data.faqs;
        } else {
            // 통신은 성공적이나, 실패 응답인 경우
            throw new Error(`HTTP ${res.status} 에러 발생`);
        }

    } catch(error) {
        // 통신 실패 및 실패 응답의 경우 예외 처리
        console.error(`응답 실패: ${error.message}`);
    }
}

// 현재 페이지 번호에 맞춰 faq 데이터를 최대 10개 추출하는 함수
function sliceFaq(arr=filterFaqArr) {
    const startIdx = (currentPage - 1) * 10;
    const endIdx = currentPage * 10;

    return arr.slice(startIdx, endIdx);
}

// 선택한 카테고리에 해당하는 faqs의 객체들만 필터링하여 화면에 렌더링하는 함수
function filterFaq(category) {
    currentPage = 1;

    filterFaqArr = category === "전체"
        ? allFaqArr 
        : allFaqArr.filter(el => el.category === category);   

    renderPagination();
    renderFaq(sliceFaq());
}

// 현 카테고리의 faq 개수를 계산하고 페이지네이션을 화면에 렌더링 해주는 함수
function renderPagination(arr=filterFaqArr) {
    lastPage = Math.ceil(arr.length / 10);
    let htmlContent =  `<li class="page-item">
                            <button type="button" class="page-link page-prev-btn" aria-label="이전 페이지로 이동" disabled>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        </li>`;

    for(let n = 1; n <= lastPage; n++) {
        if(n === 1) {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" data-num=${n} aria-label="${n}페이지로 이동" aria-current="page">${n}</button>
                            </li>`;
        } else {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" data-num=${n} aria-label="${n}페이지로 이동">${n}</button>
                            </li>`;                
        }
    }
    
    if(lastPage === 1) {
        htmlContent += `<li class="page-item">
                            <button type="button" class="page-link page-next-btn" aria-label="다음 페이지로 이동" disabled>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </li>`;
    } else {
        htmlContent += `<li class="page-item">
                            <button type="button" class="page-link page-next-btn" aria-label="다음 페이지로 이동">
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </li>`;
    }

    faqPaginationTag.innerHTML = htmlContent;
}

// 매개변수에 전달된 js 배열을 화면에 렌더링 해주는 함수
function renderFaq(arr) {
    let htmlContent = "";

    arr.forEach((item, idx) => {
        htmlContent += `<li class="accordion-item faq__item">
                            <h2 class="accordion-header">
                                <button class="flex-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded="false" aria-controls="collapse${idx}">
                                    <p class="faq__label">Q</p>
                                    <p class="faq__title">${item.question}</p>
                                </button>
                            </h2>
                            <div id="collapse${idx}" class="accordion-collapse collapse" data-bs-parent="#tabpanel-faq">
                                <div class="flex-center accordion-body">
                                    <p class="faq__label">A</p>
                                    <p class="faq__desc">${item.answer}</p>
                                </div>
                            </div>
                        </li>`
    });

    faqTabPanel.innerHTML = htmlContent;
}

// 검색창의 입력 상태에 따른 아이콘 토글 함수
function toggleSearchIcon() {
    const isEmpty = faqInput.value.trim() === "";
    searchBtn.hidden = !isEmpty;
    resetBtn.hidden = isEmpty;
}

faqInit();