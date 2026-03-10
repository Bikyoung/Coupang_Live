export async function loadComponent(component) {
    let dom = document.querySelector(`.${component}-load`);
    
    try {
        const res = await fetch(`./inc/${component}.html`);

        if(res.ok) {
            const data = await res.text();
            dom.outerHTML = data;
        } else {
            throw new Error(`HTTP ${res.status} 에러 발생`);
        }

    } catch(error) {
        console.error(`응답 실패: ${error.message}`);
    }
}


