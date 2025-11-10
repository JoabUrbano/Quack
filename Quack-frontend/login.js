/*
	DONE: conferir se já está cadastrado
	DONE: mudar de página
	TODO: ter um user adm
	
*/

const form = document.getElementById("loginForm");
form.addEventListener('submit', handleForm);

function handleForm(event) { 
	event.preventDefault(); 
	const submitObject = {
		user: document.getElementById("userLogin").value,
		password: document.getElementById("passwordLogin").value,
	}
	
	fetchUrl(`http://localhost:3001/users/`)
	.then(getContent)
	.then(users => findUser(users,submitObject))
	.then(validateLogin)
	.then(saveLocal);

} 

function saveLocal(user){
	localStorage.setItem('user', JSON.stringify(user));
         const url = `searchFlight.html`;
         window.location.href = url; 
}

function validateLogin(user){
	console.log(user);
	if(!user){
		 alert("Email ou senha errados");
		 alert("Tente: joao.silva@email.com");
		 throw new Error('NOT_FOUND');
	}
	return user;
}

async function fetchUrl(url){
	return response = await fetch(url);
}

async function getContent(response){
	return content = await response.json();
}

async function findUser(users, submitObject){
	return users.find((user) => 
				   user.email === submitObject.user);
}

