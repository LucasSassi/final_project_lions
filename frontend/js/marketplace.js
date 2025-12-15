const API_URL = 'https://final-project-0hy5.onrender.com/api';

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// DOM Elements
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const addCarBtn = document.getElementById('addCarBtn');
const carModal = document.getElementById('carModal');
const carForm = document.getElementById('carForm');
const closeModal = document.querySelector('.close');
const carsGrid = document.getElementById('carsGrid');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const modalTitle = document.getElementById('modalTitle');

// Set user name
userName.textContent = localStorage.getItem('userName') || 'Usuário';

// Current car being edited
let currentCarId = null;

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// Open modal for adding car
addCarBtn.addEventListener('click', () => {
    currentCarId = null;
    modalTitle.textContent = 'Adicionar Carro';
    carForm.reset();
    carModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    carModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === carModal) {
        carModal.style.display = 'none';
    }
});

// Load cars on page load
loadCars();

// Form submission
carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const carData = {
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value
    };
    
    try {
        const url = currentCarId 
            ? `${API_URL}/cars/${currentCarId}`
            : `${API_URL}/cars`;
        
        const method = currentCarId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(carData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            carModal.style.display = 'none';
            showSuccess(currentCarId ? 'Carro atualizado com sucesso!' : 'Carro adicionado com sucesso!');
            loadCars();
        } else {
            showError(data.message || 'Erro ao salvar carro');
        }
    } catch (error) {
        showError('Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
});

// Load all cars
async function loadCars() {
    try {
        const response = await fetch(`${API_URL}/cars`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayCars(data.cars || []);
        } else {
            showError('Erro ao carregar carros');
        }
    } catch (error) {
        showError('Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
}

// Display cars in grid
function displayCars(cars) {
    if (cars.length === 0) {
        carsGrid.innerHTML = '<div class="loading">Nenhum carro encontrado. Adicione o primeiro!</div>';
        return;
    }
    
    carsGrid.innerHTML = cars.map(car => `
        <div class="car-card">
            <h3>${car.brand} ${car.model}</h3>
            <div class="car-info">
                <p><strong>Ano:</strong> ${car.year}</p>
                <p><strong>Descrição:</strong> ${car.description || 'Sem descrição'}</p>
            </div>
            <div class="car-price">R$ ${formatPrice(car.price)}</div>
            <div class="car-actions">
                <button class="btn-edit" onclick="editCar('${car.id}')">Editar</button>
                <button class="btn-delete" onclick="deleteCar('${car.id}')">Excluir</button>
            </div>
        </div>
    `).join('');
}

// Edit car
async function editCar(carId) {
    try {
        const response = await fetch(`${API_URL}/cars/${carId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const car = data.car;
            currentCarId = carId;
            modalTitle.textContent = 'Editar Carro';
            
            document.getElementById('brand').value = car.brand;
            document.getElementById('model').value = car.model;
            document.getElementById('year').value = car.year;
            document.getElementById('price').value = car.price;
            document.getElementById('description').value = car.description || '';
            
            carModal.style.display = 'block';
        } else {
            showError('Erro ao carregar dados do carro');
        }
    } catch (error) {
        showError('Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
}

// Delete car
async function deleteCar(carId) {
    if (!confirm('Tem certeza que deseja excluir este carro?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/cars/${carId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            showSuccess('Carro excluído com sucesso!');
            loadCars();
        } else {
            const data = await response.json();
            showError(data.message || 'Erro ao excluir carro');
        }
    } catch (error) {
        showError('Erro ao conectar com o servidor');
        console.error('Erro:', error);
    }
}

// Helper functions
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Make functions globally accessible
window.editCar = editCar;
window.deleteCar = deleteCar;
