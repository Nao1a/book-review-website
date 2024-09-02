const domain = "http://localhost:8000";

async function register() {
  try {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${domain}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
    });

    const data = response.json()
    if (response.ok) {
      window.location.href = "login.html";
    } else {
      console.log("Error on registration " + data.error);
    }
  } catch (e) {
    console.log(e);
  }
}

document.getElementById("signup").addEventListener("click", register);
