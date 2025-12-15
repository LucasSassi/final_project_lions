const API_URL = 'https://final-project-0hy5.onrender.com/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const errorMessage = document.getElementById('errorMessage');
const registerErrorMessage = document.getElementById('registerErrorMessage');

// Check if user is already logged in
if (localStorage.getItem('token')) {
    window.location.href = 'marketplace.html';
}

// Toggle between login and register forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
    errorMessage.style.display = 'none';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
    registerErrorMessage.style.display = 'none';
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('userName', data.user.name);
            window.location.href = 'marketplace.html';
        } else {
            showError(errorMessage, data.message || 'Erro ao fazer login');
        }
    } catch (error) {
        showError(errorMessage, 'Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
});

// Register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        // Primeiro, cria o usuário
        const registerResponse = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const registerData = await registerResponse.json();
        
        if (registerResponse.ok) {
            // Depois faz login automático
            const loginResponse = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const loginData = await loginResponse.json();
            
            if (loginResponse.ok) {
                localStorage.setItem('token', loginData.token);
                localStorage.setItem('userId', loginData.user.id);
                localStorage.setItem('userName', loginData.user.name);
                window.location.href = 'marketplace.html';
            } else {
                showError(registerErrorMessage, 'Conta criada, mas erro ao fazer login');
            }
        } else {
            showError(registerErrorMessage, registerData.message || 'Erro ao criar conta');
        }
    } catch (error) {
        showError(registerErrorMessage, 'Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
});

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}
