import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";

import { AuthContext } from "../../../contexts/authContext";
import * as FishService from '../../../../service/FishService';
import style from './CatalogItem.module.css';

export const CatalogItem = ({
    _id,
    species,
    image,
    description,
    ownerId,
    deleteHandler
}) => {
    const { userId } = useContext(AuthContext);
    const nav = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const deleteClickHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this fish?");
        if (confirmDelete) {
            try {
                await FishService.deleteFish(_id);
                deleteHandler(_id);
                nav('/catalog');
            } catch (error) {
                console.error("Error deleting fish:", error);
            }
        }
    };

    return (
        <div className={style['items']}>
            <div className={style['card']} onClick={() => setExpanded(!expanded)}>
                <img className={style['items-image']} src={image} alt={species} />
                <div className={`${style['card-details']} ${expanded ? style['expanded'] : ''}`}>
                    <h2 className={style['items-title']}>{species}</h2>
                    {description.length > 50 ? (
                        <div>
                            <p className={style['items-description']}>{expanded ? description : `${description.slice(0, 50)}...`}</p>
                            <button onClick={() => nav(`/fishes/${_id}`)} className={style['read-more-btn']}>Read more about fish</button>
                        </div>
                    ) : (
                        <p className={style['items-description']}>{description}</p>
                    )}
                    {userId === ownerId && (
                        <div className={style['content-btn']}>
                            <Link className={style['items-edit']} to={`/fishes/${_id}/edit`}>
                                Edit
                            </Link>
                            <button className={style['delete-button']} onClick={deleteClickHandler}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};