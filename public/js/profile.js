const findProfile = async () => {
    try {
        const url = "/api/auth/profile";
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
            // Obtengo el usuario
            const user = result.response;
            // console.log(user);

            // Modifico el DOM
            document.querySelector("#user-avatar").src = user.avatar;
            document.querySelector(
                "#user-name"
            ).innerHTML = `${user.first_name} ${user.last_name}`;
            document.querySelector("#user-email").innerHTML = `${user.email}`;
            document.querySelector("#user-city").innerHTML = `${user.city}`;
            document.querySelector("#user-role").innerHTML = `${user.role}`;
        } else {
            alert(result.error);
        }
    } catch (error) {}
};

findProfile();
