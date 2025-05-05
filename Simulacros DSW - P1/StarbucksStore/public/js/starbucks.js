const host = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    cargarLocales();
    
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que recargue la página
        cargarLocales();    // Llama a la función de filtrado
      });

});

async function cargarLocales() {
        const texto = document.getElementById('texto')?.value.trim() || "";
        const hemisferio = document.getElementById('hemisferio')?.value || "Todos";

        const params = new URLSearchParams();
        if (texto !== "") params.append('texto', texto);
        if (hemisferio !== "Todos") params.append('hemisferio', hemisferio);

        const url = `${host}/api/locales?${params.toString()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al cargar los locales');

            const locales = await response.json();
            renderizarLocales(locales);
        }
        catch (error) {
            console.error('Error al cargar los locales:', error);
        }   
    }

function renderizarLocales(locales) {
    const tbody = document.getElementById("bodyTablaLocales");
    tbody.innerHTML = ""; // Limpiar tabla antes de agregar nuevos locales

    locales.forEach(local => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${local.name}</td>
            <td>${local.address}</td>
            <td>${local.city}</td>
            <td>${local.country}</td>
            <td>${local.hemisferio}</td>
        `;
        tbody.appendChild(tr)
        })
    }
