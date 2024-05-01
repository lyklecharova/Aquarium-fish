import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as FishService from '../../../service/FishService';
import style from './Create.module.css';

export const Create = () => {
    const nav = useNavigate();

    const [fish, setFish] = useState({
        species: '',
        image: null,
        description: '',
    });

    const [fishError, setFishError] = useState({});
    const fishErr = {};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFish((fish) => ({
            ...fish,
            [name]: value,
        }));
    };

    // Функцията handleImageChange се извиква при промяна на изображението в инпут полето.
    // При всяка промяна на изображението, извикваме FileReader, който ни позволява да
    // прочетем съдържанието на файла като Data URL (base64 закодиран стринг).
    const handleImageChange = (e) => {
        // Взимаме първият файл от списъка с файловете, който е избран от потребителя.
        const file = e.target.files[0];
        // Създаваме нов FileReader обект.
        const reader = new FileReader();
        // Използваме onloadend събитието, което се извиква, когато операцията на
        // FileReader приключи успешно или неуспешно.
        reader.onloadend = () => {
            // При успешно приключване, в reader.result се съдържа съдържанието на файла
            // като Data URL, което представлява файла като base64 закодиран стринг.

            // Обновяваме състоянието на компонента, за да запишем изображението в него.
            setFish((fish) => ({
                ...fish,
                image: reader.result,
            }));
        };
        // Използваме readAsDataURL(), за да прочетем съдържанието на файла като Data URL.
        reader.readAsDataURL(file);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        if (fish.species.trim() === '') {
            fishErr.speciesError = 'You should enter species';
        }
        if (e.currentTarget.image.files.length === 0) {
            fishErr.imageError = 'You should upload image';
        }
        if (fish.description.trim() === '') {
            fishErr.descriptionError = 'You should enter description'
        }

        setFishError(fishErr);

        if (Object.keys(fishErr).length === 0) {
            const editedFish = {
                species: e.currentTarget.species.value,
                image: URL.createObjectURL(e.currentTarget.image.files[0]),
                description: e.currentTarget.description.value
            };

            if (!editedFish.image) {
                alert("Please select an image");
                return; // Излизаме от функцията или изпълнението на кода
            }

            try {
                await FishService.editFish(fish, editedFish);
                nav('/catalog');
            } catch (error) {
                console.log(`Please try again ${error}`);
            }
        }

    };

    return (
        <div className={style['container']}>
            <form onSubmit={handleCreateSubmit} className={style['create-form']} method="post">
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
                {fishError.speciesError && (
                    <p className={style['error']}>{fishError.speciesError}</p>
                )}

                <div className={style['form-group']}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {fishError.imageError && (
                    <p className={style['error']}>{fishError.imageError}</p>
                )}

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
                {fishError.descriptionError && (
                    <p className={style['error']}>{fishError.descriptionError}</p>
                )}

                <button type="submit" className={style['create-button']}>Create</button>

            </form>
        </div>
    );
};
