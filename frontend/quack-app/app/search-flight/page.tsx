'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function SearchFlight(){
	const [flights, setFlights]=useState([]);
	const [currentPage, setCurrentPage]=useState(1);
	const [limit, setLimit]=useState(2);
	const [hasMore, setHasMore]=useState(false);
	
	const router = useRouter();
	
	useEffect(() => {
		fetch(`http://localhost:8000/airlineshub/flights?page=${currentPage}&limit=${limit}`,{
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
			
			})
			.then(flights => {
				setFlights(flights);
				
				setHasMore(flights.length === limit);
			
			})
			
			
		}, [currentPage])
		
	const handlePreviousPage = () => {
	  if (currentPage > 1) setCurrentPage(prev => prev - 1);
	};

	const handleNextPage = () => {
	  if(hasMore) setCurrentPage(prev => prev + 1);
	  
	};
	
	
	return(
	<>
		<header id="header">
		</header>
		
		<section className="form" id="about">
			<h2>Buscar Vôo</h2>
			<form id="flightForm">
				<input placeholder="Partida" type="text" id="departureLocation" /><br />
				<input placeholder="Destino" type="text" id="arrivalLocation" /><br />
				<input type="submit" value="Search" />
			</form>
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
						<th></th>
					</tr>
				</thead>
				<tbody id="flightTableBody">
				  {flights.map((flight) => (
				      <tr key={flight.id}>
				        <td>{flight.departureAirport.city}</td>
				        <td>{flight.arrivalAirport.city}</td>
				        <td>{new Date(flight.expectedDeparture).toLocaleString('pt-BR')}</td>
				        <td>{new Date(flight.expectedArrival).toLocaleString('pt-BR')}</td>
				        <td>
				          {(flight.value / 100).toLocaleString('pt-BR', {
				            style: 'currency',
				            currency: 'BRL',
				          })}
				        </td>
				        <td>{flight.airline?.name || '—'}</td>
				        <td>
				          <button
				            onClick={() => {
				              // Ex: redirecionar com o ID do voo
				              window.location.href = `/buy-passage?flightId=${encodeURIComponent(flight.id)}`;
				            }}
				          >
				            Comprar
				          </button>
				        </td>
				        
				        
				        </tr>
				        ))}
				
				</tbody>
			</table>
			<div style={{marginBottom:'3%'}}>
				      <div className="pagination">
				        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
				          Anterior
				        </button>
				        
				        <button onClick={handleNextPage} disabled={!hasMore}>
				          Próxima
				        </button>
				      </div>
			</div>
		</section >
	
	</>
	);
}  
