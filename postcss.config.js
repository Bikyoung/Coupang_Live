import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default {
    plugins: [
        // 브라우저 접두사를 자동으로 붙여주어 크로스 브라우징
        autoprefixer(),
        postcssSortMediaQueries({
            /* max-width를 사용하므로 desktop-first로 설정 
               min-width를 사용한다면 mobile-first로 설정 */
            sort: 'desktop-first',
        }),
    ],
};
