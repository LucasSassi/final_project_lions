# PROJETO FINAL LIONS DEV📱🚀

> Projeto final desenvolvido para o curso avançado de programação da Lions (Dez/2025).

![Status do Projeto](https://img.shields.io/badge/Status-Pendente-brightgreen)
![FlutterFlow](https://img.shields.io/badge/Frontend-FlutterFlow-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![API](https://img.shields.io/badge/API-RESTful-orange)

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação completa desenvolvida para demonstrar a integração entre um front-end *low-code* e uma API robusta desenvolvida manualmente.

O objetivo foi criar uma pagina de criar e logar usuarios , onde a interface foi construída no **FlutterFlow** e toda a regra de negócio e persistência de dados reside em uma **API RESTful** personalizada.

### 📅 Contexto Acadêmico
Projeto apresentado como requisito final do curso avançado de programação (2025), com foco em desenvolvimento de APIs e integração de sistemas.

---

## ⚙️ Arquitetura e Tecnologias

A aplicação segue a arquitetura Cliente-Servidor:

* **Front-end (Mobile/Web):** Desenvolvido em **FlutterFlow**. Responsável pela UI/UX e requisições HTTP.
* **Back-end (API):** Desenvolvido em **Node.js** com **Express**.
* **Banco de Dados:** **MongoDB** (via Mongoose) para persistência dos dados.

### Fluxo de Dados
1. O usuário interage com a interface no FlutterFlow.
2. O FlutterFlow envia requisições (GET, POST, PUT, DELETE) para a API hospedada.
3. A API processa a lógica de negócio e consulta o Banco de Dados.
4. A resposta retorna ao app para exibição ao usuário.

---

## 🚀 Funcionalidades

* **CRIAR USUARIO:** Cria o usuario com email e senha (criptografada).
* **LOGAR USUARIO:** Faz o login do usuario fazendo a verificação da senha e criando o token de autenticação.
* **Integração API:** Conexão completa via chamadas de API (API Calls) configuradas no FlutterFlow.

---

## 🔌 Documentação da API

Abaixo, os principais *endpoints* criados para este projeto:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/[recurso]` | Retorna a lista de todos os usuarios. |
| `POST` | `/api/[recurso]` | Cria um novo usuario no banco de dados. |
| `PUT` | `/api/[recurso]/:id` | Atualiza as informações de um usuario específico. |
| `DELETE`| `/api/[recurso]/:id` | Remove um usuario do sistema. |

> **Nota:** A API conta com validações de entrada e tratamento de erros para garantir a segurança da integração.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
* Node.js instalado.
* Conta no FlutterFlow.

### Passos para o Back-end
1. Clone este repositório: https://github.com/LucasSassi/final_project_lions.git
