# QuackHub

## 📑 About the Project
Quack is a platform created to manage microservices for airline ticketing systems, currency exchange programs, and loyalty programs.
This project is being developed for the subjects of WEB 2 development and fault tolerance. For fault tolerance, the focus is on building an architecture with microservices, while for WEB 2 development the focus is on CRUD functionalities.

# 🔧 Technologies Used
[![Technologies](https://skillicons.dev/icons?i=docker,ts,nest,postgres,prisma)]()

## Backend
* NestJS
* Prisma
* PostgreSQL

## Infrastructure
* Docker

## 📣 Running the Project
Prerequisites: npm / yarn and Docker installed

<h2>Rodando no Docker</h2>

```bash
# clone the repository
git clone https://github.com/JoabUrbano/Quack.git

# navigate to the project directory
cd quack

yarn install

docker compose up -d
```

Para testar o fluxo principal, use uma feerramenta como o Postman rodando a rota:
http://imdtravel:3000/tickets/buyTicket

Há um arquivo seed que vai popular os dados do banco quando subir o docker compose.


## :dart: Project Status
Backend: In Progress


# Authors
<a href="https://github.com/luizgustavoou">Luiz Gustavo de Oliveira Umbelino</a><br>
<a href="https://github.com/JoabUrbano">Joab Urbano</a><br>
<a href="https://github.com/Gaplima">Gabriel Alves Pinheiro Lima</a><br>

# Endpoints for the web development subject 2
<a href="https://github.com/Viniciusfqmedeiros">Vinicius</a><br>
