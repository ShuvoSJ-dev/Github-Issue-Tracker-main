document.getElementById("loginBtn").addEventListener("click", function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const defaultUsername = "admin";
    const defaultPassword = "admin123";

    if (username === defaultUsername && password === defaultPassword) {
        window.location.href = "./dashboard.html";
    } else {
        alert("Username or Password Not Matched.");
    }
});