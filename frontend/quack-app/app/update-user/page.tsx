'use client'

import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useRouter} from 'next/navigation';

export default function updateUser(){
	const { user} = useAuth();
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');

	const {login} = useAuth();
	const router = useRouter();
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		
		const responseAuth = await fetch(`http://localhost:3001/users/${user.id}`, {
			method: 'PATCH',
			headers: { 
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({name,email,password}),
			
			});
		
		const result = await responseAuth.json();
		
		if(result.email !== null){
		
			await new Promise(resolve => setTimeout(resolve, 100));
				
			const responseUsr = await fetch('http://localhost:3001/users',{
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				
			});
			const users = await responseUsr.json();
				
			const user = users.find((u: any) => 
			{	
				return u.email === email.toLowerCase();
			}
			);
			
			console.log(user);
			
			const userData ={
				id: user.id,
				name: user.name,
				email: user.email,
				password: password,
			};
				
				
				login(userData);
				
		}
		setLoading(false);
	}

	return(
	<>
			<header id="header">
			</header>
			<section id="about">
				<h2>Atualizar usuário</h2>
				<form id="loginForm" onSubmit={handleSubmit}>
					<input placeholder="Nome" type="text" id="userName" 
						value={name}
						onChange={(e) => setName(e.target.value)}
					
					required/>
					<br />
					<input placeholder="Email" type="text" id="email" 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					required/>
					<br />
					<input minLength="6" 
					autoComplete="off"
					placeholder="Senha" type="password" id="passwordLogin" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					required/>
					<br />
					<input type="submit" value="Autalize"
					onClick={() => alert(`Usuário atualizado!`)}
					
					/>
				</form>
			</section>
	</>
	);
}
