'use client'; 

import { useEffect } from 'react';

export default function GoogleFonts(){
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		document.head.appendChild(link);
		
		return () =>{
			document.head.removeChild(link);
		}
	}, [])
	
	return null;
}
