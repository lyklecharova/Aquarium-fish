import style from './PageNotFound.module.css';
export const PageNotFound = () => {
    return (
        <div className={style['error']}>
            <img className={style['error-image']} src="/image/vecteezy_illustration-of-404-page-not-found_7711625.jpg" alt="error-page" />
        </div>
    );
};