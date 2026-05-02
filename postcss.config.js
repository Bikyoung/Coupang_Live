import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default {
    plugins: [
        // 브라우저 접두사를 자동으로 붙여주어 크로스 브라우징
        autoprefixer(),
        // 동일한 media query를 하나로 병합하여 파편화된 CSS 정리
        combineMediaQuery(),
        //media query 정렬 순서
        postcssSortMediaQueries({
            /* max-width를 사용하므로 desktop-first로 설정 
               min-width를 사용한다면 mobile-first로 설정 */
            sort: 'desktop-first',
        }),
    ],
};
