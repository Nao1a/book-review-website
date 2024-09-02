document.addEventListener("DOMContentLoaded", async () => {
  const domain = "http://localhost:8000";
  fetchBooks();
  checkUser();

  // fetch home page books
  function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
  }

  async function fetchBooks() {
    const response = await fetch(`${domain}/api/books/`);
    if (response.ok) {
      const data = await response.json();
      const booksList = document.getElementById("booksList");
      booksList.textContent = "";
      for (let i in data) {
        const div = document.createElement("div");
        div.innerHTML = `<a href="book.html?id=${data[i].id}"
                        class="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl mt-6">
                        <img class="object-cover w-full rounded-t-lg h-48  md:w-48 md:rounded-none md:rounded-s-lg" src="${
                          data[i].thumbnail
                        }" alt>
                        <div
                            class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${
                              data[i].title
                            }</h5>
                            <p class="mb-3 font-normal text-gray-700">${truncate(
                              data[i].description,
                              250
                            )}</p>
                            <div class="flex justify-between">
                                <p>${data[i].pageCount} pages</p>
                                <p>${data[i].publishedDate}</p>
                            </div>
                        </div>
                    </a>`;
        booksList.appendChild(div);
      }
    }
  }

  async function checkUser() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${domain}/api/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    if(response.ok) {
      const data = await response.json()
      document.getElementById('auth').style.display = 'none'
      document.getElementById('username').style.display = 'block'
      document.getElementById('username').textContent = data.username
    } else {
      document.getElementById('auth').style.display = 'block'
      document.getElementById('username').style.display = 'none'
    }
  }

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchValue = searchInput.value;

      const response = await fetch(
        `${domain}/api/books/search?query=${searchValue}`
      );

      if (response.ok) {
        const data = await response.json();
        const booksList = document.getElementById("booksList");
        booksList.textContent = "";
        for (let i in data) {
          const div = document.createElement("div");
          div.innerHTML = `<a href="book.html?id=${data[i].id}"
                          class="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl mt-6">
                          <img class="object-cover w-full rounded-t-lg h-48  md:w-48 md:rounded-none md:rounded-s-lg" src="${
                            data[i].thumbnail
                          }" alt>
                          <div
                              class="flex flex-col justify-between p-4 leading-normal">
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${
                                data[i].title
                              }</h5>
                              <p class="mb-3 font-normal text-gray-700">${truncate(
                                data[i].description,
                                250
                              )}</p>
                              <div class="flex justify-between">
                                  <p>${data[i].pageCount} pages</p>
                                  <p>${data[i].publishedDate}</p>
                              </div>
                          </div>
                      </a>`;
          booksList.appendChild(div);
        }
      }
    }
  });
});
