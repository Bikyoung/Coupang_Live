import { commonInit } from "./common.js";

const faqTitle = document.querySelector(".faq__title");
const faqUlTag = document.querySelector(".faq__list");
const faqPaginationTag = document.querySelector(".faq__pagination");
const faqTabs = document.querySelector(".faq__tabs");
const faqTabArr = [...document.querySelectorAll(".faq__tab")];
const faqInput = document.querySelector(".faq__input");
const searchBtn = document.querySelector(".button__submit");
const resetBtn = document.querySelector(".button__reset");

let allFaqArr = [];
let filterFaqArr;
let currentPage = 1;

// faq.html 첫 로드 시 실행할 초기화 함수
async function faqInit() {
    await commonInit();

    faqTabArr.forEach((faqTab) => {
        faqTab.setAttribute("disabled", true);
    });

    await getFaq();
    filterFaqArr = allFaqArr;

    renderPagination();
    renderFaq(sliceFaq());

    // 이벤트 리스너 등록

    /* 해당 페이지 번호에 맞는 faq 데이터를 렌더링하는 클릭 이벤트를 페이지네이션에 등록 
       이벤트 위임과 이벤트 버블링 활용 */
    faqPaginationTag.addEventListener("click", (e) => {
        const target = e.target.closest(".page-num-btn");
        const pageNumBtnList = document.querySelectorAll(".page-num-btn");

        /* 클릭 이벤트가 발생한 요소를 포함한 상위 요소에 .page-num-btn이 없다면 콜백 함수 탈출 
           = 페이지 번호 버튼을 클릭한 것이 아니라면 무시함 */
        if (!target) {
            return;
        }

        currentPage = Number(target.textContent);
        renderFaq(sliceFaq());

        pageNumBtnList.forEach(btn => 
            btn === target 
            ? btn.setAttribute("aria-current", "page") 
            : btn.removeAttribute("aria-current")
        );
        
        // 화면 상단으로 이동
        faqTitle.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    faqTabArr.forEach(tab => tab.removeAttribute("disabled"));
    
    // 카테고리 탭 버튼 클릭 시 필터링 및 렌더링을 수행하는 이벤트 등록
    faqTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".faq__tab");

        if(!target) {
            return;
        }

        // 모든 .faq__tab을 선택 해제하고, 클릭한 탭만 선택 상태로 변경
        faqTabArr.forEach(tab => tab.setAttribute("aria-selected", tab === target ? "true" : "false"));

        // 각 .faq__tab에 데이터 필터링 및 렌더링을 수행하는 클릭 이벤트 등록
        faqInput.value = "";
        toggleSearchIcon();
        filterFaq(target.textContent);
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
                faqUlTag.innerHTML = `<p class="no-result">검색 결과가 없습니다</p>`;
                return;
            }

            renderPagination(res);
            renderFaq(sliceFaq(res));
        }
    });

    [searchBtn, resetBtn].forEach(btn => 
        btn.addEventListener("click", () => {
            toggleSearchIcon();
        })
    );

    resetBtn.addEventListener("click", (e) => {
        faqInput.value = "";
        currentPage = 1;
        
        toggleSearchIcon();
        renderPagination();
        renderFaq(sliceFaq());    
    });
}

// faq.json 파일을 faq.js 파일에 연결하고 읽어와서 faqs 배열을 전역변수 faqList에 할당하는 비동기 함수
async function getFaq() {
    try {
        const res = await fetch("./assets/data/faq.json");

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
    const lastPageNum = Math.ceil(arr.length / 10);
    let htmlContent =  `<li class="page-item">
                            <button type="button" class="page-link" href="#" aria-label="Previous" disabled>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        </li>`;

    for(let n = 1; n <= lastPageNum; n++) {
        if(n === 1) {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" aria-label="${n}페이지로 이동" aria-current="page">${n}</button>
                            </li>`;
        } else {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" aria-label="${n}페이지로 이동">${n}</button>
                            </li>`;                
        }
    }
    
    htmlContent += `<li class="page-item">
                        <button type="button" class="page-link" href="#" aria-label="Previous" disabled>
                            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </li>`;

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
                            <div id="collapse${idx}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="flex-center accordion-body">
                                    <p class="faq__label">A</p>
                                    <p class="faq__desc">${item.answer}</p>
                                </div>
                            </div>
                        </li>`
    });

    faqUlTag.innerHTML = htmlContent;
}

// 검색창의 입력 상태에 따른 아이콘 토글 함수
function toggleSearchIcon() {
    const isEmpty = faqInput.value === "";

    searchBtn.classList.toggle("d-none", !isEmpty);
    resetBtn.classList.toggle("d-none", isEmpty);
}

faqInit();