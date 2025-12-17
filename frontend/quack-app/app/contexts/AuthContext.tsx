'use client';
import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';

interface  User{
	id: string;
	name: string;
	email: string;
	password: string;
}

interface AuthContextType{
	user: User | null;
	login: ( userData: User) => void;
	logout: () => void;
	isAuthenticated: boolean;
	loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children : ReactNode;
}

export function AuthProvider({children}: AuthProviderProps){
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() =>{
			const storedUser = localStorage.getItem('user');
			if(storedUser){
				setUser(JSON.parse(storedUser));
			}
			setLoading(false);
		}, []);
		



	const login = (userData, User) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};
	
	const logout = () => { 
		setUser(null);
		localStorage.removeItem('user');
	router.push('/login');
		    
		
		
	};
	
	const isAuthenticated = !!user;
	
	const value: AuthContextType = {
		user,
		login,
		logout,
		isAuthenticated,
		loading
	};
	return 	(
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
	
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	return context;
}
