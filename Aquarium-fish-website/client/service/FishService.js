export async function addFish(fish) {
    const URL = 'http://localhost:3030/fish/add';

    await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
        body: JSON.stringify(fish),
    });
}
export async function getAllFishes() {
    const URL = 'http://localhost:3030/fish';
    const response = await fetch(URL)
    const data = await response.json();
    return data;

};

export async function getOneFish(id) {
    const URL = `http://localhost:3030/fish/${id}`;
    const response = await fetch(URL)
    const data = await response.json();
    return data;

};

export async function editFish(fish) {
    const URL = `http://localhost:3030/fish/${fish._id}`;
    const response = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
        body: JSON.stringify(fish)
    })
    const data = await response.json();
    return data;

};

export async function deleteFish(id) {
    console.log(id)
    const URL = `http://localhost:3030/fish/${id}`;
    const deleteFish = await fetch(URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': JSON.parse(localStorage.getItem('UserInfo'))?.token
        },
    });

    const data = await deleteFish.json();
    console.log(data);
    return data;
}
