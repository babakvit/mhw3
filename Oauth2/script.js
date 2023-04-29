/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

var ArrayofAnswers = [null, null, null];


const answerArray = document.querySelectorAll(".choice-grid div");
for (const answer of answerArray){
    answer.addEventListener('click', changeToSelected);
}


function question(selected, index){
    if (ArrayofAnswers[index] !== null){ //se array non era null allora devo deselezionare l'immagine
        ArrayofAnswers[index].querySelector(".checkbox").src = "images/unchecked.png";
        ArrayofAnswers[index].classList.remove("selezionato");
    }   

    //seleziono l'immagine selezionata
    ArrayofAnswers[index] = selected;
    ArrayofAnswers[index].classList.remove("unselected");
    ArrayofAnswers[index].classList.add("selezionato");
    ArrayofAnswers[index].querySelector(".checkbox").src = "images/checked.png";
    
    //metto unselected tutti i blocchi non selezionati  
    for (let elem of document.querySelectorAll(".choice-grid div")){
        if (elem.dataset.questionId === selected.dataset.questionId){
            if (elem !== selected){
                elem.classList.add("unselected");
            }
        }
    }
       
    if (!ArrayofAnswers.includes(null)){
        visualizzaRisultato();
    }
        
}

function visualizzaRisultato(){
    
    const divFinale = document.querySelector("#risultatoFinale");
    const testoRisultato = document.querySelector("#testoRisultato");
    const titoloRisultato = document.querySelector("#risultatoh1");
    const tasto = document.querySelector("#restart");
    tasto.addEventListener('click', ricominciaQuiz)


    if (!ArrayofAnswers.includes(null)){
        let risultato = null;
        for (let i = 0; i < ArrayofAnswers.length; i++){
            for (let j = i+1; j < ArrayofAnswers.length; j++){
                if(ArrayofAnswers[i].dataset.choiceId === ArrayofAnswers[j].dataset.choiceId)
                    result = ArrayofAnswers[i].dataset.choiceId;
            }
        }
        
        if (risultato === null){
            risultato = ArrayofAnswers[0].dataset.choiceId;
        }
        
        testoRisultato.textContent = RESULTS_MAP[risultato].contents;
        titoloRisultato.textContent = RESULTS_MAP[risultato].title;

    }

    divFinale.classList.remove("hidden");
}

function ricominciaQuiz(event){
    let daNascondere = document.querySelector("#risultatoFinale");
    daNascondere.classList.add("hidden");
    //cambiamo ogni immagine selezionata su unchecked
    for (let i = 0; i < ArrayofAnswers.length; i++){
        ArrayofAnswers[i].querySelector(".checkbox").src = "images/unchecked.png";
        ArrayofAnswers[i].classList.remove("selezionato");
    }
    const arr = document.querySelectorAll(".choice-grid div");
    for (let elem of arr){
        elem.classList.remove("unselected");
    }
    ArrayofAnswers = [null, null, null];
}


function changeToSelected(event){
   const selected = event.currentTarget;
   if (selected.dataset.questionId == "one"){
    question(selected, 0);
   }
   else if (selected.dataset.questionId == "two"){
    question(selected, 1);
   }
   else question(selected, 2);
}

//parte aggiunta da homework 3
//integro api di petfinder 

let token_data;
const max_results = 3;

function getToken(json)
{
	token_data = json;
    console.log("inside get token");
	console.log(token_data);
}

function onTokenResponse(response) {
    console.log("token response received");
  return response.json();
}

const client_id = "12d611d3fe8a22d";
const client_secret = "d15c4c055ce7b79e7b014106ec25053d84c74c54";

const key_petfinder = "v1CWbAnsJodkEvg7ocJMTkdTXhCkyyJE55zvAqrA3hbRof27KE"
const secret_petfinder = "kMVbiuY0WimOJlJ9UKXe0jypDyhTNYWciwQfhGiI"




const pet_api_endpoint_token = 'https://api.petfinder.com/v2/oauth2/token' 
const pet_api_endpoint = 'https://api.petfinder.com/v2/animals' 

let currentTrg;


const list = document.querySelectorAll("#clickOn");

for (const elem of list){
    elem.addEventListener('click', gestione);
}

function gestione(event){
    const current = event.currentTarget;
    currentTrg = event.currentTarget;
    switch(current.dataset.animalType){
        case "dog":
            fetch('https://api.petfinder.com/v2/animals?type=' + 'dog' + '&status=' + 'adoptable', 
			{
				headers: {
					'Authorization': token_data.token_type + ' ' + token_data.access_token,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onJson);
            break;
        case "cat":
            fetch('https://api.petfinder.com/v2/animals?type=' + 'cat' + '&status=' + 'adoptable', 
			{
				headers: {
					'Authorization': token_data.token_type + ' ' + token_data.access_token,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onJson);
            break;
        case "bird":
            fetch('https://api.petfinder.com/v2/animals?species=parrot&status=adoptable', 
			{
				headers: {
					'Authorization': token_data.token_type + ' ' + token_data.access_token,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onJson);
            break;
        default: break;

    }
}



fetch(pet_api_endpoint_token,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key_petfinder + '&client_secret=' + secret_petfinder,
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}
).then(onTokenResponse).then(getToken);




function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onJson(json){
    console.log(json);
    const animal_list = json.animals;
    let num = 0;
    currentTrg.classList.add('hidden');
    let animal = currentTrg.dataset.animalType;
    console.log(animal);

        for (let i = 0; i<animal_list.length; i++){
            if (num === 3) break;
            if (animal_list[i].photos.length !== 0){
                num++;
                const link = document.createElement('a');
                const mainDiv = document.createElement('div');
                mainDiv.classList.add("animal");
                const photo = document.createElement('img');
                photo.src = animal_list[i].photos[0].full;
                photo.classList.add('animalimg');
                const boxForName = document.createElement('h2');
                const onAppend = document.querySelectorAll("#adoption");
                boxForName.textContent = animal_list[i].name;
                link.textContent = "Adottami";
                link.href = animal_list[i].url;
                
                console.log(photo.src);
                mainDiv.appendChild(photo);
                mainDiv.appendChild(boxForName);
                mainDiv.appendChild(link);
                for (const elem of onAppend){
                    if (elem.dataset.animalClass === animal)
                        elem.appendChild(mainDiv);
                }
                
            }
        }
    
}



