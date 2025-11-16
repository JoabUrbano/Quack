window.addEventListener('DOMContentLoaded', () => {
  loadPerfil();
  mountTable();
});

const form = document.getElementById("logoutForm");
form.addEventListener('submit', handleForm);

async function handleForm(event) { 
	event.preventDefault(); 
	localStorage.clear();
        const url = `login.html`;
        window.location.href = url; 
	
}

function loadPerfil(){
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	let userTitle = document.getElementById("perfilNameTitle");
	
	userTitle.innerHTML +=  ` ${user.name}`;

}

function mountTable(submitObject){

	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	
	fetchUrl("http://localhost:3001/airtickets?limit=1000")
	.then(getContent)
	.then(tickets => filterTickets(tickets, user.id))
	.then(fillTable);
}

async function fetchUrl(url){
	return response = await fetch(url);
}

async function getContent(response){
	return content = await response.json();
}

async function filterTickets(tickets, userId){
	console.log(tickets);
	return tickets.filter((tickets) => 
						tickets.userId === userId
	);
}


async function findFlight(flights, flightId){
	return flights.find((flight) =>{ 
				   return flight.id === flightId;
				   });
}


async function fillTable(tickets) {
  let tbody = document.getElementById("flightTableBody");
  tbody.innerHTML = '';
  
  const flights = await getContent(await fetchUrl("http://localhost:3001/flights/"));

  for (let ticket of tickets) {
      const flight = await findFlight(flights, ticket.flightId);
      
	let row = document.createElement("tr");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	let td4 = document.createElement("td");
	let td5 = document.createElement("td");
	let td6 = document.createElement("td");
	let td7 = document.createElement("td");
	let td8 = document.createElement("td");
		
	td5.classList.add("checkTd");

	td1.innerHTML = flight.departureAirport.city;
	td2.innerHTML = flight.arrivalAirport.city;
	td3.innerHTML = flight.expectedDeparture;
	td4.innerHTML = flight.expectedArrival;
	td5.innerHTML = flight.value/100;
	td6.innerHTML = flight.airline.name;
		
	td7.innerHTML = ticket.seatNumber;
	td8.innerHTML = ticket.finalValue;

	row.appendChild(td1);
	row.appendChild(td2);
	row.appendChild(td3);
	row.appendChild(td4);
	row.appendChild(td5);
	row.appendChild(td6);
	row.appendChild(td7);
	row.appendChild(td8);
        tbody.appendChild(row);
     

  }
}
    
 
