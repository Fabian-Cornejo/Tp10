// Función asincrónica para simular una solicitud de pedido
async function placeOrder() {
    // Devuelve una nueva Promesa
    return new Promise((resolve) => {
        // Simula un retraso en la solicitud usando setTimeout
        setTimeout(() => {
            // Cuando el retraso termina, resuelve la Promesa con el mensaje de éxito
            resolve("Pedido realizado con éxito!"); // Mensaje de éxito
        }, 1000); // Retraso de 1 segundo
    });
}

// Función asincrónica para manejar el clic en el botón de realizar pedido
async function handleOrderButtonClick() {
    // Crea un nuevo elemento <div> para mostrar el estado del pedido
    const statusElement = document.createElement('div');
    // Añade una clase CSS al nuevo elemento para aplicar estilos
    statusElement.classList.add('order-status'); // Añade una clase para estilo
    // Establece el texto inicial del elemento <div> para indicar que el pedido está en proceso
    statusElement.textContent = "Pedido en proceso...";
    // Agrega el nuevo elemento <div> al contenedor con id 'order-status-container' en el DOM
    document.getElementById('order-status-container').appendChild(statusElement); // Agrega el mensaje al contenedor

    const states = [
        "Pedido en proceso...",  // Primer estado (inicio)
        "Preparando el pedido...",  // Estado 2
        "Listo para entregar...", // Estado 3
        "En camino...", // Estado 4
        "Pedido realizado con éxito!" // Estado final
    ];

    // Mostrar el primer mensaje inmediatamente
    statusElement.textContent = states[0]; 

    // Función para mostrar los estados con un retraso entre ellos
    for (let i = 1; i < states.length; i++) {
        // Espera 2 segundos entre cada estado
        await new Promise(resolve => setTimeout(resolve, 2000));
        statusElement.textContent = states[i]; // Actualiza el mensaje de estado
    }

    try {
        // Llama a la función placeOrder y espera a que se complete
        const response = await placeOrder(); // Realiza el pedido
        // Una vez completado el pedido, actualiza el texto del elemento <div> con el mensaje de éxito
        statusElement.textContent = response; // Coloca el mensaje final de éxito
        // Añade una clase CSS para indicar que el pedido fue exitoso
        statusElement.classList.add('order-success'); // Añade clase de éxito
    } catch (error) {
        // Si ocurre un error al realizar el pedido, captura el error
        statusElement.textContent = `Error: ${error.message}`;
        // Añade una clase CSS para indicar que ocurrió un error
        statusElement.classList.add('order-error'); // Añade clase de error
    }
}

// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Agrega un manejador de eventos al botón con id 'place-order-btn'
    // Cuando se haga clic en el botón, se llamará a la función handleOrderButtonClick
    document.getElementById('place-order-btn').addEventListener('click', handleOrderButtonClick);
});
