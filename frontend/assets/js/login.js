const domain = "https://book-review-website-lq06.onrender.com";

async function login() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${domain}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("token", data);
      window.location.href = "index.html";
    } else {
      console.log("Error on registration " + data.error);
    }
  } catch (e) {
    console.log(e);
  }
}

document.getElementById("login").addEventListener("click", login);
