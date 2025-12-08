'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useAuth} from '../contexts/AuthContext';

export default function perfil(){
	const [flights, setFlights]=useState([]);
	const [tickets, setTickets]=useState([]);
	const [loading, setLoading]=useState(true);
	const router = useRouter();
	const { user} = useAuth();
	const { logout: authLogout} = useAuth();
	  
	useEffect(() => {
		setLoading(true);
		
		Promise.all([
			fetch('http://localhost:3001/airtickets',{
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
			
			
			})	
			.then(res => {
				if(res.status === 401){
					router.push('/login');
					return [];
				}
				return res.json();
				}),
			
			fetch('http://localhost:3001/flights',{
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
			})
			.then(res => res.json())
		])
		.then(([ticketsJson, flightsJson]) => {
			setTickets(ticketsJson);
			setFlights(flightsJson);
		
		}).finally(() => {
			setLoading(false)
		})
		
	}, [])
	
	const userTickets = tickets.filter(t => t.userId === user.id);
	
	const passages = userTickets
		.map(ticket => {
			const flight = flights.find(flight => flight.id === ticket.flightId);
			return flight ? {...ticket, flight} : null;
		})
		.filter(passage => passage != null);
	
	if(loading){
		return <div> Carregando...</div>;
	}
	
	async function logout(){
		const response = await fetch('http://localhost:8000/auth/logout',{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application-json',
			},
		});
		
		authLogout();
	}
	
		
	return(
	<>
		<header id="header">
		</header>
		<section  id="about">
			<h2 id="perfilNameTitle">Esas são as suas passagens, </h2>
		</section >
		
		<section id="table">
			<table id="flightTable">
				<thead>
					<tr>
						<th>Local Partida</th>
						<th>Local Destino</th>
						<th> Data partida</th>
						<th> Data chegada</th>
						<th>Preço</th>
						<th>Airline</th>
						<th>Assento </th>
						<th>Remover</th>
						<th></th>
					</tr>
				</thead>
				<tbody >
				  {passages.map((passage) => (
				      <tr key={passage.id}>
				        <td>{passage.flight.departureAirport.city}</td>
				        <td>{passage.flight.arrivalAirport.city}</td>
				        <td>{new Date(passage.flight.expectedDeparture).toLocaleString('pt-BR')}</td>
				        <td>{new Date(passage.flight.expectedArrival).toLocaleString('pt-BR')}</td>
				        <td>
				          {(passage.flight.value / 100).toLocaleString('pt-BR', {
				            style: 'currency',
				            currency: 'BRL',
				          })}
				        </td>
				        <td>{passage.flight.airline?.name || '—'}</td>
				        <td>{passage.seatNumber}</td>
				        <td>
				          <button
				            onClick={async () => {
						const response = await fetch(`http://localhost:3001/airtickets/${passage.id}`, {
							method: 'DELETE',				    
							headers: {
								'Content-Type':'application/json',
							},
							credentials: 'include',
						}).then(console.log);
						window.location.reload();
				              
				            }}
				          >
				            Remover
				          </button>
				        </td>
				      </tr>
				      ))}
				</tbody>
			</table>
			<form className ="form" id="logoutForm">
				<input type="submit" value="Logout"
					onClick={logout}
				
				
				/>
				<input type="button" value="Editar Informações"
					  onClick={() => router.push('/update-user')}
				/>
				<br/>
			</form>
		</section >
	
	</>
	);
}
