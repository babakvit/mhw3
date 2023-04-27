const form = document.querySelector("form");
form.addEventListener('submit', search);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4e29f14b4fmsh3348f24e25eeb6ap1bb658jsn003362189bb0',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};



//google news api



function search(event){
    event.preventDefault();
    const search_input = document.querySelector("#content").value;
    const search_content = encodeURI(search_input);

    console.log("Eseguo la ricerca di " + search_content);

    /*const link = 'https://ny-times-movie-reviews.p.rapidapi.com/reviews/search.json?api-key=4e29f14b4fmsh3348f24e25eeb6ap1bb658jsn003362189bb0&critics-pick=Y&order=by-opening-date';
    fetch(link, options).then(onResponse).then(onJson);*/
    const link = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=' + search_content;
    fetch(link, options).then(onResponse).then(onJson);
    

}


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onJson(json){
    console.log(json);
    

    let arrayOfElements = json.items;
    let numRisultati = 4;

    if (arrayOfElements.length < numRisultati) numRisultati = arrayOfElements.length;

    for (let i = 0; i < numRisultati; i++){
        const mainDiv = document.createElement('div');
    const ImageOfVid = document.createElement('img');
    const h1description = document.createElement('h1');
    const album = document.querySelector('#album-view');

        h1description.textContent = arrayOfElements[i].title;
        ImageOfVid.src = arrayOfElements[i].thumbnails[0].url;

        mainDiv.appendChild(h1description);
        mainDiv.appendChild(ImageOfVid);

        mainDiv.classList.add('#album-view.div');

        album.appendChild(mainDiv);
    }
}

