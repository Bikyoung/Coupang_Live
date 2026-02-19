import { commonInit } from "./common.js";

const faqTitle = document.querySelector(".faq__title");
const faqUlTag = document.querySelector(".faq__list");
const faqPaginationTag = document.querySelector(".faq__pagination");
const faqTabArr = [...document.querySelectorAll(".faq__tab")];
const faqInput = document.querySelector(".faq__input");
const searchBtn = document.querySelector(".button__submit");
const resetBtn = document.querySelector(".button__reset");

let faqList = [];
let filterFAQList;
let pageNum;
let currentPage = 1;

// faq.html 첫 로드 시 실행할 초기화 함수
async function faqInit() {
    await commonInit();

    faqTabArr.forEach((faqTab) => {
        faqTab.setAttribute("disabled", true);
    });

    await getFAQ();
    filterFAQList = faqList;

    renderPagination();
    renderFAQ(sliceFAQ(currentPage));

    // 이벤트 리스너 등록
    /* 해당 페이지 번호에 맞는 faq 데이터를 렌더링하는 클릭 이벤트를 페이지네이션에 등록 
        이벤트 위임과 이벤트 버블링 활용 */
    faqPaginationTag.addEventListener("click", (e) => {
        const targetBtn = e.target.closest(".page-num-btn");
        const paginationArr = document.querySelectorAll(".page-num-btn");

        // 버튼 외의 빈 공간 클릭 시 무시
        if (!targetBtn) {
            return;
        }

        currentPage = targetBtn.dataset.num;
        renderFAQ(sliceFAQ(currentPage));

        paginationArr.forEach((pagination) => {
            pagination.removeAttribute("aria-current");
        });
        targetBtn.setAttribute("aria-current", "page");
        
        // 화면 상단으로 이동
        faqTitle.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    faqTabArr.forEach((faqTab) => {
        faqTab.addEventListener("click", (e) => {
            // 클릭 이벤트가 발생한 탭을 지칭
            const eventTarget = e.currentTarget;
            
            // 모든 .faq__tab을 선택 해제하고, 클릭한 탭만 선택 상태로 변경
            faqTabArr.forEach((tab) => {
                tab.setAttribute("aria-selected", "false");
            });
            eventTarget.setAttribute("aria-selected", "true");

            // 각 .faq__tab에 데이터 필터링 및 렌더링을 수행하는 클릭 이벤트 등록
            faqInput.value = "";    // .faq__input의 value 초기화
            toggleSearchIcon();
            filterFAQ(eventTarget.textContent);
        });
    });

    // .faq__input에 검색어 입력을 통한 필터링 및 렌더링을 수행하는 이벤트 등록
    faqInput.addEventListener("input", function() {
        currentPage = 1;
        toggleSearchIcon();

        // 검색 효율 극대화를 위해 텍스트 내 모든 공백을 제거한 후 비교
        const inputText = this.value.replace(/\s/g, "");
        let res = filterFAQList.filter((faq) => {
            return faq.question.replace(/\s/g, "").includes(inputText);
        });

        if(res.length === 0) {
            faqUlTag.innerHTML = `<p class="no-result">검색 결과가 없습니다</p>`;
        } else {
            renderPagination(res);
            renderFAQ(sliceFAQ(currentPage, res));
        }

        if(inputText === "") {
            resetFilterFAQList();
        }
    });

    [searchBtn, resetBtn].forEach((btn) => {
        btn.addEventListener("click", () => {
            setTimeout(() => toggleSearchIcon(), 10);
        });
    });

    resetBtn.addEventListener("click", resetFilterFAQList);

    faqTabArr.forEach((tab) => {
        tab.removeAttribute("disabled");
    });
}

// faq.json 파일을 faq.js 파일에 연결하고 읽어와서 faqs 배열을 전역변수 faqList에 할당하는 비동기 함수
async function getFAQ() {
    try {
        const res = await fetch("./assets/data/faq.json");

        if(res.ok) {
            const data = await res.json();
            faqList = data.faqs;
        } else {
            // 응답은 성공적이나, 데이터 수신이 불가한 경우 예외 처리
            throw new Error(`HTTP 에러 발생: ${res.status}`);
        }

    } catch(error) {
        // 응답이 실패한 경우 예외 처리
        console.error(`응답 실패: ${error}`);
    }
}

// 현재 페이지 번호에 맞춰 faq 데이터를 최대 10개 추출하는 함수
function sliceFAQ(currentPage, res=filterFAQList) {
    const startIdx = (currentPage - 1) * 10;
    const endIdx = startIdx + 10;

    return res.slice(startIdx, endIdx);
}

// 선택한 카테고리에 해당하는 faqs의 객체들만 필터링하여 화면에 렌더링하는 함수
function filterFAQ(category) {
    currentPage = 1;

    if(category === "전체") {
        filterFAQList = faqList;
    } else {
        filterFAQList = faqList.filter((faq) => {
            return faq.category === category;
        });
    }   

    renderPagination();
    renderFAQ(sliceFAQ(currentPage));
}

// 현 카테고리의 faq 개수를 계산하고 페이지네이션을 화면에 렌더링 해주는 함수
function renderPagination(res=filterFAQList) {
    pageNum = Math.ceil(res.length / 10);
    let htmlContent =  `<li class="page-item">
                            <button type="button" class="page-link" href="#" aria-label="Previous" disabled>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        </li>`;

    for(let i = 1; i <= pageNum; i++) {
        if(i === 1) {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" data-num="${i}" aria-label="${i}페이지" aria-current="page">${i}</button>
                            </li>`;
        } else {
            htmlContent += `<li class="flex-center page-item">
                                <button type="button" class="page-link page-num-btn" data-num="${i}" aria-label="${i}페이지">${i}</button>
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
function renderFAQ(list) {
    let htmlContent = "";

    list.forEach((item, idx) => {
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

// .faq__input에 입력된 텍스트가 지워졌을 때 현 카테고리에 해당하는 faqs의 객체들만 화면에 렌더링하는 함수 
function resetFilterFAQList() {
    const currentTab = faqTabArr.find((faqTab) => {
        return faqTab.getAttribute("aria-selected") === "true";
    });
    const currentCategory = currentTab.textContent;

    filterFAQ(currentCategory);
}

// 검색창 입력 상태에 따른 아이콘 토글 함수
function toggleSearchIcon() {
    if(faqInput.value === "") {
        searchBtn.classList.remove("d-none");
        resetBtn.classList.add("d-none");
    } else {
        searchBtn.classList.add("d-none");
        resetBtn.classList.remove("d-none");
    }
}

faqInit();