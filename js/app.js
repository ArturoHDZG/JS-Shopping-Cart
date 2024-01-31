'use strict';

//? Variables

const carrito = document.querySelector('#carrito');
const carritoLista = document.querySelector('#lista-carrito tbody');
const carritoVaciar = document.querySelector('#vaciar-carrito');
const cursosLista = document.querySelector('#lista-cursos');
let carritoItems = [];

//? Función para cargar todos los 'event listeners'
listener();

function listener() {
  // Agregar cursos al carrito de compras
  cursosLista.addEventListener('click', cursoAgregar);

  // Eliminar cursos del carrito de compras
  carrito.addEventListener('click', cursoEliminar);

  // Vaciar carrito de compras
  carritoVaciar.addEventListener('click', () => {
    carritoItems = [];
    limpiarHTML();
  });
}

//? Funciones de CursoAgregar ()

// Agregar curso al carrito de compras
function cursoAgregar(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
    cursoDatos(curso);
  }
}

// Obtener datos del curso
function cursoDatos(curso) {
  const cursoInfo = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // Revisar si el curso ya existe en el carrito de compras
  const cursoExiste = carritoItems.some(curso => curso.id === cursoInfo.id);

  if (cursoExiste) {
    carritoItems = carritoItems.map(curso => {
      if (curso.id === cursoInfo.id) {
        curso.cantidad++;
      }

      return curso;
    });
  } else {
    carritoItems = [ ...carritoItems, cursoInfo ];
  }

  carritoHTML();
}

// Construir e insertar el HTML de los cursos agregados
function carritoHTML() {
  limpiarHTML();

  carritoItems.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id } = curso
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>
      <img src="${imagen}" width="100">
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
    </td>
    `;

    carritoLista.appendChild(row);
  });
}

// Limpiar HTML para evitar duplicación de código
function limpiarHTML() {

  while (carritoLista.firstChild) {
    carritoLista.removeChild(carritoLista.firstChild);
  }
}

//? Funciones de cursoEliminar()

// Eliminar curso del carrito de compras
function cursoEliminar(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    carritoItems = carritoItems.filter(curso => curso.id !== cursoId);

    // Iterar sobre el carrito y borrar el HTML del curso eliminado
    carritoHTML();
    console.log(carritoItems);
  }
}
