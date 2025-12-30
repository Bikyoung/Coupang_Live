export async function loadComponent(component) {
    let dom = document.querySelector(`.${component}-load`);
    
    try {
        let res = await fetch(`./inc/${component}.html`);

        if(res.ok) {
            let data = await res.text();
            dom.outerHTML = data;
        } else {
            throw new Error(`HTTP 에러 발생: ${res.status}`);
        }

    } catch(error) {
        console.error(`응답 실패: ${error}`);
    }
}


