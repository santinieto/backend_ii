const showMenu = async () => {
    try {
        const url = "/api/auth/control-panel";
        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const response = await fetch(url, opts);
        const result = await response.json();
        console.log(result);

        // Gestiono el resultado
        if (result.status === "success") {
            // Obtengo el usuario
            const user = result.response;
            // console.log(user);

            // Modifico el DOM
            document.querySelector("#control-panel-div").innerHTML =
                "Bienvenido al panel de control!";
        } else {
            document.querySelector("#control-panel-div").innerHTML =
                "El usuario no tiene permisos para acceder al panel de control!";
        }
    } catch (error) {}
};
showMenu();
