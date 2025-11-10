/*
	DONE: Carregar informações página
	DONE: enviar requisição com informações do usuário.
	TODO: acrescentar final value posteriormente
	
*/
window.onload = loadInfo();

function loadInfo(){
	getPassageContent()
	.then(fillInfo);
}

function getPassageContent(){
	idParam = getIdParam();
	return fetchUrl(`http://localhost:3001/flights/`)
	.then(getContent)
	.then(flights => filterById(flights, idParam))
}

const form = document.getElementById("ticketForm");
form.addEventListener('submit', handleForm);

async function handleForm(event) { 
	event.preventDefault(); 

	const currentFlight = await getPassageContent();
	
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	
	const date = new Date();
	const formatedDate = date.toISOString()
	
	idParam = getIdParam();
	if(await verifyTicket(idParam, user.id) === undefined){
	
		const submitObject = {
			flight: currentFlight.flightNumber,
			day: currentFlight.expectedDeparture,
			userId: user.id,
		}
		
		newTicket(submitObject,);
	        const url = `perfil.html`;
	        window.location.href = url; 
        }else{
	        alert("Você já possui esse ticket");
        }
	

} 

async function verifyTicket(flightId, userId){

	const tickets = await fetchUrl(`http://localhost:3001/airtickets/`)
	.then(getContent)
	.then(tickets => filterTicketsById(tickets, flightId));
	
	foundTicket = tickets.find(ticket => ticket.userId === userId);
	return foundTicket;
}


async function newTicket(ticket){
	const response = await fetch('http://localhost:3000/tickets/buyTicket',{
		method: 'POST',
		headers:{
			'Content-type': 'application/json',
		},
		body: JSON.stringify(ticket),
	});

}

function getIdParam(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const flightId = urlParams.get('flightId');
	return flightId;
}

async function fetchUrl(url){
	return response = await fetch(url);
}

async function getContent(response){
	return content = await response.json();
}

async function filterById(flightList, idParam){
	return flightList.filter((flight) => 
						flight.id === idParam)[0];
}

async function filterTicketsById(flightList, idParam){
	return flightList.filter((ticket) => 
						ticket.flightId === idParam);
}

function fillInfo(flight){

	let passageTitle = document.getElementById("arrivalLocationTitle");
	passageTitle.innerHTML +=  `${flight.arrivalAirport.city}`;
	
	let departureLocationInfo= document.getElementById("departureLocationInfo");
	departureLocationInfo.innerHTML += `${flight.departureAirport.city}`;
	
	let departureDateInfo= document.getElementById("departureDateInfo");
	departureDateInfo.innerHTML +=  `${flight.expectedDeparture}`;
	
	let arrivalLocationInfo = document.getElementById("arrivalLocationInfo");
	arrivalLocationInfo.innerHTML +=  `${flight.arrivalAirport.city}`;
	
	let arrivalDateInfo = document.getElementById("arrivalDateInfo");
	arrivalDateInfo.innerHTML +=  `${flight.expectedArrival}`;
	
	let airlineInfo = document.getElementById("airlineInfo");
	airlineInfo.innerHTML +=  `${flight.airline.name}`;
	
	let airPlaneInfo = document.getElementById("airplaneInfo");
	airPlaneInfo.innerHTML +=  `${flight.airplane.model}`;
	
	let ticketValue = document.getElementById("ticketValueInfo");
	ticketValueInfo.innerHTML +=  `${flight.value/100} R$`;
	
}
