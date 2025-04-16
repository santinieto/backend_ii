document.addEventListener("DOMContentLoaded", async () => {
    try {
        const url = "/api/auth/delete-product";
        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, opts);
        const result = await response.json();

        const productsDiv = document.querySelector("#products-div");

        if (result.status === "success") {
            const productList = await getProductList();
            if (!productList) return;
            // console.log(productList);

            showProductList(productList, productsDiv);
        } else {
            if (result.code === 401) {
                // Si no hay token, redirigir a la página de login
                alert(`No hay usuarios logeados`);
                window.location.replace("/login");
            } else if (result.code === 403) {
                // Mensaje de error si no tiene permisos
                productsDiv.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        El usuario no tiene permisos para acceder al panel de control.
                    </div>
                `;
            } else {
                // Mensaje de error genérico
                productsDiv.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Hubo un error al cargar el panel. Intentalo de nuevo más tarde.
                    </div>
                `;
            }
        }
    } catch (error) {
        // Si no hay token, redirigir a la página de login
        document.querySelector("#control-panel-div").innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Hubo un error al cargar el panel. Intentalo de nuevo más tarde.
                </div>
            `;
        console.error("Error al cargar el panel de control:", error);
    }
});

const getProductList = async () => {
    const url = "/api/products";
    const opts = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, opts);
    const result = await response.json();

    if (result.code === 200) {
        return result.response; // Devuelve la lista de productos
    } else {
        console.error("Error al obtener la lista de productos:", result);
        return null;
    }
};

const showProductList = (productList, productsDiv) => {
    // Crear el HTML para la lista desplegable
    const select = document.createElement("select");
    select.classList.add("form-select", "mb-3");
    select.id = "product-selector";

    // Agregar una opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.text = "Selecciona un producto";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    // Llenar la lista con los productos
    productList.forEach((product, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = product.name;
        select.appendChild(option);
    });

    // Div donde se mostrará la info del producto
    const productInfoDiv = document.createElement("div");
    productInfoDiv.id = "product-info";

    // Escuchar el cambio de selección
    select.addEventListener("change", (e) => {
        const selectedProduct = productList[e.target.value];
        productInfoDiv.innerHTML = `
                    <h5>Información del Producto</h5>
                    <p><strong>ID:</strong> ${selectedProduct._id}</p>
                    <p><strong>Nombre:</strong> ${selectedProduct.name}</p>
                    <p><strong>Precio:</strong> ${selectedProduct.price}</p>
                    <p><strong>Descripción:</strong> ${
                        selectedProduct.description || "Sin descripción"
                    }</p>
                `;
        addDeleteButton(selectedProduct._id, productInfoDiv); // Agregar botón de eliminar
    });

    // Insertar en el DOM
    productsDiv.innerHTML = ""; // Limpiar contenido previo
    productsDiv.appendChild(select);
    productsDiv.appendChild(productInfoDiv);
};

const addDeleteButton = (productID, productInfoDiv) => {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "mt-3");
    deleteButton.textContent = "Eliminar Producto";

    deleteButton.addEventListener("click", async () => {
        const url = `/api/products/${productID}`;
        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, opts);
        const result = await response.json();

        if (result.code === 200) {
            alert("Producto eliminado con éxito.");
            window.location.replace("/products"); // Redirigir a la lista de productos
        } else {
            alert("Error al eliminar el producto.");
        }
    });

    productInfoDiv.appendChild(deleteButton);
};
