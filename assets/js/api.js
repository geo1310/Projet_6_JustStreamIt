// appel de l'api

async function fetchData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


export { fetchData };

