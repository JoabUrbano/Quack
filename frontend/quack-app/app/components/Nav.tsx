'use client';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Nav(){
	const {user, isAuthenticated} = useAuth();
	return(
		<nav>
			<div id="nav-content">
				<a href="/search-flight"> 
					<h1 >Quack</h1>
				</a>
				<a href="/profile">
					<h2 id="nav-links">
						Olá, {isAuthenticated ? user?.name : 'Visitante'}
					</h2>
				</a>
			</div>
		</nav>
	);
}
