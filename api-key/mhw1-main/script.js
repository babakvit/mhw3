console.log("1")
const buttons = document.querySelectorAll("#yticon");
for (const elem of buttons){
    elem.addEventListener('click', onClick);
}
let film_name;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4e29f14b4fmsh3348f24e25eeb6ap1bb658jsn003362189bb0',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};


function onClick(event){
    const button = event.currentTarget;
    console.log("hello");
    console.log(button.dataset.clickId);
    console.log(button.dataset.filmId);
    richiediInfoDaApi(button.dataset.filmId);
    switch(button.dataset.filmId){
        case "Amelie Poulain":
            film_name = "#album-view1";
            break;
        case "nuovo cinema paradiso":
            film_name = "#album-view2";
            break;
        case "metropolis film":
            film_name = "#album-view3";
            break;
        case "quarto potere":
            film_name = "#album-view4";
            break;
        default:
            film_name = "#album-view5";
            
    }

}

function richiediInfoDaApi(nome_film){
    const search_content = encodeURI(nome_film);
    console.log("Eseguo la ricerca di " + search_content);
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
    
    let numRisultati = 3;

    if (arrayOfElements.length < numRisultati) numRisultati = arrayOfElements.length;
    

    for (let i = 0; i < numRisultati; i++){
        const mainDiv = document.createElement('div');
        const ImageOfVid = document.createElement('img');
        const h1description = document.createElement('h2');
        const album = document.querySelector(film_name);
        const link = document.createElement('a');

        
        link.textContent = "Clicca per guardarlo";
        link.href = arrayOfElements[i].url;
        h1description.textContent = arrayOfElements[i].title;
        ImageOfVid.src = arrayOfElements[i].bestThumbnail.url;
        ImageOfVid.classList.add('imageFromYT');

        h1description.appendChild(link);
        mainDiv.appendChild(h1description);
        mainDiv.appendChild(ImageOfVid);

        mainDiv.classList.add('#album-view.div');

        album.appendChild(mainDiv);
    }
}