// document.addEventListener("DOMContentLoaded", function () {
//     const cartsDropdownMenu = document.getElementById("cartsDropdownMenu");

//     // Simulación de llamada a un servidor/API que devuelve los carritos
//     fetch("/api/carts")
//         .then((response) => response.json())
//         .then((carts) => {
//             carts.forEach((cart) => {
//                 const li = document.createElement("li");
//                 const a = document.createElement("a");
//                 a.className = "dropdown-item";
//                 a.href = `/carts/${cart.id}`; // Ajusta según tu ruta
//                 a.textContent = `Carrito ${cart.id}`;
//                 li.appendChild(a);
//                 cartsDropdownMenu.appendChild(li);
//             });
//         })
//         .catch((error) => {
//             console.error("Error al cargar los carritos:", error);
//             const li = document.createElement("li");
//             li.textContent = "Error al cargar carritos";
//             li.className = "dropdown-item text-danger";
//             cartsDropdownMenu.appendChild(li);
//         });
// });
