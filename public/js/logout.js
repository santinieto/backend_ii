const logOut = async () => {
    try {
        const url = "/api/auth/logout";
        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const response = await fetch(url, opts);
        const result = await response.json();
        // console.log(result);

        // Gestiono el resultado
        if (result.status === "success") {
            // Elimino el token del localStorage
            localStorage.removeItem("token");

            // Redirijo al usuario a la pagina de inicio
            alert("Logout exitoso!");
            window.location.href = "/";
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.log(error);
        alert("Error en el logout!");
    }
};
logOut();
