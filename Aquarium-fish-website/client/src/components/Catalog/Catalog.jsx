import { useEffect, useState } from 'react';

import { CatalogItem } from './CatalogItem/CatalogItem';
import * as FishService from '../../../service/FishService';
import style from './Catalog.module.css';

export const Catalog = () => {
    const [fishes, setFishes] = useState([]);
    useEffect(() => {
        FishService.getAllFishes()
            .then(res => {
                setFishes(res)
            });
    }, [])

    const deleteHandler = (fishId) => {
        setFishes(fish => fish.filter(b => b._id !== fishId));
    }

    return (
        <div className={style['container']}>
            {fishes && <>{
                fishes.map((fishes) => {
                    return <CatalogItem key={fishes._id} {...fishes} deleteHandler={deleteHandler} />
                })
            }</>}
            {fishes.length === 0 && (
                <div>
                    <h2 className={style['error']}>Sorry, but you can not find fish yet &#128031;
                        !</h2>
                </div>

            )}

        </div>
    );
};