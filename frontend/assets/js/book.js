document.addEventListener("DOMContentLoaded", async () => {
  const domain = "http://localhost:8000";

  const currentUrl = new URL(window.location.href);
  const urlId = currentUrl.searchParams.get("id");

  //   fetch books be id
  book(urlId);
  // Fetch reviews
  getReview(urlId)

  checkUser()

  async function book(bookId) {
    try {
      const response = await fetch(`${domain}/api/books/${bookId}`);

      if (response.ok) {
        const data = await response.json();
        document.getElementById("bookImg").src = data.thumbnail;
        document.getElementById("bookTitle").textContent = data.title;
        document.getElementById("bookDescription").innerHTML = data.description;
        document.getElementById(
          "bookPages"
        ).textContent = `${data.pageCount} pages`;
        document.getElementById("bookDate").textContent = data.publishedDate;
        document.getElementById("bookAuthor").textContent = data.authors;
      } else {
        console.log(e);
        // window.location.href = "index.html";
      }
    } catch (e) {
      console.log(e);
      //   window.location.href = "index.html";
    }
  }

  async function getReview(bookId) {
    try {
      const response = await fetch(`${domain}/api/books/reviews/${bookId}`);

      if (response.ok) {
        const data = await response.json();
        const reviewList = document.getElementById('reviewList')
        reviewList.textContent = ''
        data.forEach(item => {
          const div = document.createElement('div')
          div.innerHTML = `<div class="bg-gray-100 p-4 rounded-2xl mt-4">
                              <div class="flex items-center mb-4">
                                    <div class="font-medium">
                                        <p>${item.username} (${item.rating} out of 5)</p>
                                    </div>
                                </div>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">${item.comment}</p>
                              </div>`
          reviewList.appendChild(div);
        });
      } else {
        document.getElementById("bookReview").textContent =
          response.json().message;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function writeReview() {
    try {
      const token = localStorage.getItem("token");
      const fetchData = await fetch(`${domain}/api/books/${urlId}`);
      if (!fetchData) return;

      const data = await fetchData.json();
      bookId = data.id;
      bookTitle = data.title;

      const reviewMessage = document.getElementById("reviewMessage").value;
      const rate = document.getElementById("rate").value;
      

      const response = await fetch(`${domain}/api/books/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          bookId: bookId,
          bookTitle: bookTitle,
          rating: rate,
          comment: reviewMessage,
        }),
      });

      if(response.ok) {
        document.getElementById("reviewMessage").value = ''
      }

      getReview(urlId);
    } catch (e) {
      console.log(e);
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
      document.getElementById('signupRequire').style.display = 'none'
      document.getElementById('reviewSubmit').style.display = 'block'

      document.getElementById('auth').style.display = 'none'
      document.getElementById('username').style.display = 'block'
      document.getElementById('username').textContent = data.username
    } else {
      document.getElementById('auth').style.display = 'block'
      document.getElementById('username').style.display = 'none'

      document.getElementById('signupRequire').style.display = 'block'
      document.getElementById('reviewSubmit').style.display = 'none'
    }
  }

  document.getElementById("reviewSubmit").addEventListener("click", writeReview);
});
