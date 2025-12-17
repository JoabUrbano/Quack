'use client';
import {useSearchParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';

type Flight = {
  id: string;
  departureAirport: { city: string };
  arrivalAirport: { city: string };
  expectedDeparture: string;
  expectedArrival: string;
  value: number;
  airline: { name: string };
};


export default function SearchFlight(){
	const searchParams= useSearchParams();
	const [flight, setFlight] = useState<any>(null);
	const [hasPurchased, setHasPurchased] = useState(false);
	const router = useRouter();
	const {user} = useAuth();
	  
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
		const flightId = searchParams.get('flightId');
		
		fetch('http://localhost:8000/airlineshub/flights/', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		
		})
		.then( res => res.json())
		.then( (flights: Flight[]) => {
		     const found = flights.find((f) => f.id === flightId);
		     setFlight(found);
		        
		})
		.finally(() => {
			setLoading(false);
	        });
	        
	        
	        
		        
		        
	}, [searchParams])
	
	if(loading){
		return <div>Carregando informações do voo...</div>;
	}
	
	const handleBuyTicket = async (e: React.FormEvent) => {
		e.preventDefault()
		
		fetch('http://localhost:8000/airlineshub/airtickets/', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		
		})
		.then( res => res.json())
		.then( (tickets: Ticket[]) => {
		     const found = tickets.find((t) => t.userId === user.id);
		     if(found){
			     setHasPurchased(true);
			     alert("já foi compro")
		     }
		        
		})
		    
		if(!hasPurchased){
			const currentDate = new Date().toISOString();
			const ticket ={
				flight: flight.flightNumber,
				day:currentDate,
				ft:true,
			}
			
			const response = await fetch('http://localhost:3000/tickets/buyTicket',
			{
				method: 'POST',				    
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(ticket),
			},
			);
			console.log(response);
			
		}
		router.push('/profile');
		
		
	}
	
	
	
	return(
	<>
		<header id="header">
		</header>
		
		<section className="form" id="about">
			<h2>Comprar Passagem</h2>
			<ul id="passageInfo"> 
				<li id="departureLocationInfo">Local Embarque: {flight.departureAirport.city}</li>
				<li id="departureDateInfo">Data de embarque: {flight.expectedDeparture}</li>
				<li id="arrivalLocationInfo">Local de Desembarque: {flight.arrivalAirport.city}</li>
				<li id="arrivalDateInfo">Data de desembarque: {flight.arrivalAirport.city} </li>
				<li id="airlineInfo">Linha Aérea: {flight.airline.name}</li>
				<li id="airplaneInfo">Avião: {flight.airplane.model}</li>
				<li id="ticketValueInfo">Valor Passagem:{flight.value} </li>
			</ul>
		
			<ul id="flightInfo"> 
			</ul>
			<form id="ticketForm" onSubmit={handleBuyTicket}>
				<input type="submit" value="Buy" disabled={hasPurchased}/>
			</form>
		</section >
	
	</>
	);
}
