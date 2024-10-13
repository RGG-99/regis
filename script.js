document.addEventListener('DOMContentLoaded', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const deviceForm = document.getElementById('deviceForm');
    const closeModal = document.querySelector('.close');
    const form = document.getElementById('form');
    const deviceList = document.getElementById('deviceList');
    const clearDevicesBtn = document.getElementById('clearDevicesBtn');
    const searchInput = document.getElementById('searchInput');

    let devices = []; // Almacenaremos los dispositivos aquí
// Variables de usuario
const validUsername = "usuario"; // Cambia esto por el nombre de usuario que desees
const validPassword = "contraseña"; // Cambia esto por la contraseña que desees

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const login = document.getElementById('login');

    // Muestra el formulario de inicio de sesión al cargar la página
    loginForm.style.display = 'block';

    // Manejo del envío del formulario de inicio de sesión
    login.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            alert('Inicio de sesión exitoso');
            loginForm.style.display = 'none'; // Cierra el formulario de inicio de sesión
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});

function closeLogin() {
    document.getElementById('loginForm').style.display = 'none';
}

    addDeviceBtn.addEventListener('click', () => {
        deviceForm.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        deviceForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === deviceForm) {
            deviceForm.style.display = 'none';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ownerName = document.getElementById('ownerName').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const deviceModel = document.getElementById('deviceModel').value;
        const problem = document.getElementById('problem').value;
        const cost = document.getElementById('cost').value;
        const arrivalDate = document.getElementById('arrivalDate').value;
        const arrivalTime = document.getElementById('arrivalTime').value;
        const deviceImage = document.getElementById('deviceImage').files[0];
        const delivered = document.getElementById('delivered').checked;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newDevice = {
                ownerName,
                contactNumber,
                deviceModel,
                problem,
                cost,
                arrivalDate,
                arrivalTime,
                image: e.target.result,
                delivered
            };
            devices.push(newDevice);
            updateDeviceList();
            deviceForm.style.display = 'none';
            form.reset();
        };
        reader.readAsDataURL(deviceImage);
    });

    clearDevicesBtn.addEventListener('click', () => {
        devices = []; // Vaciar el array de dispositivos
        updateDeviceList(); // Actualizar la lista
    });

    window.deleteDevice = (index) => {
        devices.splice(index, 1); // Eliminamos el dispositivo del array
        updateDeviceList(); // Actualizamos la lista
    };

    window.markAsDelivered = (index) => {
        devices[index].delivered = !devices[index].delivered; // Cambiar estado de entregado
        updateDeviceList(); // Actualizamos la lista
    };

    function updateDeviceList() {
        deviceList.innerHTML = ''; // Limpiamos la lista actual
        devices.forEach((device, index) => {
            const deviceItem = document.createElement('div');
            deviceItem.className = 'device-item';
            deviceItem.innerHTML = `
                <img src="${device.image}" alt="Dispositivo" style="width: 100px; border-radius: 5px;">
                <p><strong>Dueño:</strong> ${device.ownerName}</p>
                <p><strong>Número:</strong> ${device.contactNumber}</p>
                <p><strong>Modelo:</strong> ${device.deviceModel}</p>
                <p><strong>Problema:</strong> ${device.problem}</p>
                <p><strong>Costo:</strong> $${device.cost}</p>
                <p><strong>Fecha de Llegada:</strong> ${device.arrivalDate} ${device.arrivalTime}</p>
                <p><strong>Entregado:</strong> ${device.delivered ? 'Sí' : 'No'}</p>
                <button class="delivered-button" onclick="markAsDelivered(${index})">Marcar como Entregado</button>
            `;
            deviceList.appendChild(deviceItem);
        });
    }

    window.searchDevices = () => {
        const query = searchInput.value.toLowerCase();
        const filteredDevices = devices.filter(device => 
            device.ownerName.toLowerCase().includes(query) || 
            device.deviceModel.toLowerCase().includes(query)
        );
        updateDeviceList(filteredDevices);
    };

    function updateDeviceList(filteredDevices) {
        deviceList.innerHTML = ''; // Limpiamos la lista actual
        const devicesToDisplay = filteredDevices || devices; // Si hay filtrados, mostrar eso, sino, mostrar todos
        devicesToDisplay.forEach((device, index) => {
            const deviceItem = document.createElement('div');
            deviceItem.className = 'device-item';
            deviceItem.innerHTML = `
                <img src="${device.image}" alt="Dispositivo" style="width: 100px; border-radius: 5px;">
                <p><strong>Dueño:</strong> ${device.ownerName}</p>
                <p><strong>Número:</strong> ${device.contactNumber}</p>
                <p><strong>Modelo:</strong> ${device.deviceModel}</p>
                <p><strong>Problema:</strong> ${device.problem}</p>
                <p><strong>Costo:</strong> $${device.cost}</p>
                <p><strong>Fecha de Llegada:</strong> ${device.arrivalDate} ${device.arrivalTime}</p>
                <p><strong>Entregado:</strong> ${device.delivered ? 'Sí' : 'No'}</p>
                <button class="delivered-button" onclick="markAsDelivered(${index})">Marcar como Entregado</button>
            `;
            deviceList.appendChild(deviceItem);
        });
    }
});
