'use client'

import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useRouter} from 'next/navigation';

export default function Login(){
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
		
		
		const responseAuth = await fetch('http://localhost:8000/auth/login', {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({email,password}),
			
			});
		
		const result = await responseAuth.json();
		console.log(result)
		
		if(result.message === "Login successful"){
		
			await new Promise(resolve => setTimeout(resolve, 100));
				
			const responseUsr = await fetch('http://localhost:3001/users',{
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				
			});
			console.log(responseUsr)
			const users = await responseUsr.json();
				
			console.log(users);
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
		                window.location.href = `/search-flight`;
				
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
				<h2>Login</h2>
				<form id="loginForm" onSubmit={handleSubmit}>
					<input placeholder="Email" type="text" id="userLogin" 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					
					required/>
					<br />
					<input 
					minLength="6"
					autoComplete="off"
					placeholder="Senha" type="password" id="passwordLogin" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					required/>
					<br />
					<input type="submit" value="Entrar!"/>
				</form>
				<a href="register">Cadastre-se</a>
			</section>
	</>
	);
}
