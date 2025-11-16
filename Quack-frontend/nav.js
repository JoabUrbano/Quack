document.addEventListener('DOMContentLoaded', function () {
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	
	const navLinks = document.getElementById('nav-links');
	
	const link = document.createElement('a');
        link.href = 'perfil.html';
        link.textContent = user.name;
        link.style.color = 'inherit'; 
        link.style.textDecoration = 'none'; 
        navLinks.innerHTML = 'Olá, '; 
        navLinks.appendChild(link);
});

function requireAuth() {
	const userStr = localStorage.getItem('user');
	console.log(userStr);
    
	if (!userStr || 
	        userStr.trim() === '' || 
                userStr === 'null' || 
                userStr === '{}' || 
                userStr === 'undefined') 
                {
	                alert('Sessão expirada ou usuário não autenticado.');
	                window.location.href = 'login.html';
	                localStorage.removeItem('user');
	                window.location.href = 'login.html';
		}
}
         

