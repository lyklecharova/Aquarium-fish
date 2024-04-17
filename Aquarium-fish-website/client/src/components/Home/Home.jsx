import { Link } from 'react-router-dom';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style['container']}>
            <div className={style['home']}>
                <h1 className={style['title']}>Welcome to Aquarium Fish Website</h1>
                <Link className={style['link']} to="/catalog">
                    Explore Our Catalog
                </Link>
            </div>
        </div>
    );
};