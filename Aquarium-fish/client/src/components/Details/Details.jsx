import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as FishService from '../../../service/FishService';
import style from './Details.module.css'

export const Details = () => {
    const [fish, setFish] = useState({});
    const { fishId } = useParams();

    useEffect(() => {
        FishService.getOneFish(fishId)
            .then(result => setFish(result))
    }, [fishId]);

    return (
        <>
            {fish && <div className={style['details-container']}>
                <div className={style['details-description']}>
                    <p>{fish.description}</p>
                </div>
            </div>}
        </>
    );
};