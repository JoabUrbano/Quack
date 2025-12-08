'use client'

import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useRouter} from 'next/navigation';

export default function Register(){
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');

	const {login} = useAuth();
	const router = useRouter();
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		
		const responseAuth = await fetch('http://localhost:8000/auth/register', {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({name,email,password}),
			
			});
		
		const result = await responseAuth.json();
		
		if(!result.error){
		
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
			
			const userData ={
				id: user.id,
				name: user.name,
				email: user.email,
			};
				
				
			alert("Usuário cadastrado");
			login(userData);
				
		}
		else{
			alert(result.message);
		}
		setLoading(false);
	}

	return(
	<>
			<header id="header">
			</header>
			<section id="about">
				<h2>Cadastro</h2>
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
					<input 
					autoComplete="off"
					minLength="6" placeholder="Senha" type="password" id="passwordLogin" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					required />
					<br />
					<input type="submit" value="Cadastre-se!"/>
				</form>
			</section>
	</>
	);
}
