// appels de l'api

// recuperation des donnees d'une url
async function fetchData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// recupération de l'id du meilleur film
async function bestMovieId(){
    try {  
        const dataApi = await fetchData("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
        const bestMovie = dataApi.results[0]
        return bestMovie.id
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        throw error; 
    }
}

// recuperation des donnees avec l'id
async function movieId(id){
    try {  
        const dataId = await fetchData(`http://127.0.0.1:8000/api/v1/titles/${id}`);
        return dataId
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        throw error; 
    }
}


export { fetchData, bestMovieId, movieId };

