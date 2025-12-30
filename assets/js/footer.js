export async function footerLoader() {
    const footerLoad = document.querySelector(".footer-load");
    
    try {
        let res = await fetch("./inc/footer.html");

        if(res.ok) {
            let data = await res.text();
            footerLoad.outerHTML = data;
        } else {
            throw new Error(`HTTP 에러 발생: ${res.status}`);
        }

    } catch(error) {
        console.error(`응답 실패: ${error}`);
    }
}


