document.addEventListener("DOMContentLoaded", async () => {
    try {
        const url = "/api/auth/update-product";
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
        document.querySelector("#products-div").innerHTML = `
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
        // Creo el formulario con los valores por defecto que tiene el producto
        addUpdateProductForm(selectedProduct, productInfoDiv);
    });

    // Insertar en el DOM
    productsDiv.innerHTML = ""; // Limpiar contenido previo
    productsDiv.appendChild(select);
    productsDiv.appendChild(productInfoDiv);
};

const addUpdateProductForm = (productoInfo, productInfoDiv) => {
    productInfoDiv.innerHTML = ""; // Limpiar contenido previo

    const form = document.createElement("form");
    form.classList.add("p-3", "border", "rounded", "bg-light");

    // Nombre
    const nameGroup = document.createElement("div");
    nameGroup.classList.add("mb-3");
    nameGroup.innerHTML = `
        <label for="product-name" class="form-label">Nombre del producto</label>
        <input type="text" class="form-control" id="product-name" value="${productoInfo.name}" required>
    `;
    form.appendChild(nameGroup);

    // Precio
    const priceGroup = document.createElement("div");
    priceGroup.classList.add("mb-3");
    priceGroup.innerHTML = `
        <label for="product-price" class="form-label">Precio</label>
        <input type="number" class="form-control" id="product-price" value="${productoInfo.price}" step="0.01" required>
    `;
    form.appendChild(priceGroup);

    // Descripción
    const descriptionGroup = document.createElement("div");
    descriptionGroup.classList.add("mb-3");
    descriptionGroup.innerHTML = `
        <label for="product-description" class="form-label">Descripción</label>
        <textarea class="form-control" id="product-description" rows="3" required>${productoInfo.description}</textarea>
    `;
    form.appendChild(descriptionGroup);

    // Botón de envío
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.classList.add("btn", "btn-primary");
    submitBtn.textContent = "Actualizar producto";
    form.appendChild(submitBtn);

    // Evento de envío
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedProduct = {
            id: productoInfo._id,
            name: document.getElementById("product-name").value,
            price: parseFloat(document.getElementById("product-price").value),
            description: document.getElementById("product-description").value,
        };

        try {
            const response = await fetch(`/api/products/${productoInfo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const result = await response.json();
            if (result.code === 200) {
                alert("Producto actualizado correctamente.");
                window.location.replace("/products"); // Redirigir a la lista de productos
            } else {
                alert("Error al actualizar el producto.");
                console.error(result);
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert("Error de red al intentar actualizar el producto.");
        }
    });

    productInfoDiv.appendChild(form);
};
