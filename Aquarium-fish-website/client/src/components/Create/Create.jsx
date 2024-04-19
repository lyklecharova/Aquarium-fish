import { useState } from 'react';

import style from './Create.module.css';

export const Create = () => {

    const [fish, setFish] = useState({
        name: '',
        species: '',
        image: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFish((fish) => ({
            ...fish,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted fish:', fish);
    }
    return (
        <div className={style['container']}>
            <form onSubmit={handleSubmit} className={style['create-form']} method="post">
                <div className={style['form-group']}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={fish.name}
                        onChange={handleInputChange}
                        placeholder="Enter fish name..."
                    />
                </div>

                <div className={style['form-group']}>
                    <label htmlFor="species">Species</label>
                    <input
                        type="text"
                        id="species"
                        name="species"
                        value={fish.species}
                        onChange={handleInputChange}
                        placeholder="Enter fish species..."
                    />
                </div>

                <div className={style['form-group']}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                </div>

                <div className={style['form-group']}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={fish.description}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Enter fish description..."
                    ></textarea>
                </div>

                <button type="submit" className={style['create-button']}>Create</button>

            </form>
        </div>
    );
};