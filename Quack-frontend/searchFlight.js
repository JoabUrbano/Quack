window.onload = mountFullTable();
const form = document.getElementById("flightForm");
form.addEventListener('submit', handleForm);

function handleForm(event) { 
	event.preventDefault(); 
	const submitObject = {
		departure : document.getElementById("departureLocation").value,
		arrival: document.getElementById("arrivalLocation").value,
	}

	mountTable(submitObject);
} 

function mountTable(submitObject){
	
	fetchUrl("http://localhost:3001/flights/")
	.then(getContent)
	.then(flights => filterFlights(flights, submitObject))
	.then(fillTable);
}

function mountFullTable(){
	
	fetchUrl("http://localhost:3001/flights/")
	.then(getContent)
	.then(fillTable);
}

async function fetchUrl(url){
	return response = await fetch(url);
}

async function getContent(response){
	return content = await response.json();
}

async function filterFlights(flightList, submitObject){
        console.log(flightList);
	return flightList.filter((flight) => {
						
				const matchesDeparture = !submitObject.departure || 
					flight.departureAirport.city === submitObject.departure;
				const matchesArrival = !submitObject.arrival || 
					flight.arrivalAirport.city === submitObject.arrival;
				
				return matchesDeparture && matchesArrival;
				});
}

function fillTable(flights){
	let tbody = document.getElementById("flightTableBody");
	tbody.innerHTML = '';
	flights.forEach(flight => {
	
		let row = document.createElement("tr");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let td5 = document.createElement("td");
		let td6 = document.createElement("td");
		td5.classList.add("checkTd");
		var td7 = document.createElement("button");
		td7.innerHTML = "Buy";
		td7.classList.add("buyButton");
		
		td7.addEventListener("click", () => {
		    const url = `buyPassage.html?flightId=${flight.id}`;
		    window.location.href = url; 
		});

		td1.innerHTML = flight.departureAirport.city;
		td2.innerHTML = flight.arrivalAirport.city;
		td3.innerHTML = flight.expectedDeparture;
		td4.innerHTML = flight.expectedArrival;
		td5.innerHTML = flight.value;
		td6.innerHTML = flight.airline.name;

		row.appendChild(td1);
		row.appendChild(td2);
		row.appendChild(td3);
		row.appendChild(td4);
		row.appendChild(td5);
		row.appendChild(td6);
		row.appendChild(td7);
	        tbody.appendChild(row);
	});

}
