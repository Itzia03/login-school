/*
MENU CONTROL
*/

function updateMenu() {

  const token = localStorage.getItem("token")

  const loginLink = document.getElementById("loginLink")
  const adminLink = document.getElementById("adminLink")
  const logoutBtn = document.getElementById("logoutBtn")

  if (!loginLink) return

  if (token) {

    loginLink.style.display = "none"

    if (adminLink)
      adminLink.style.display = "inline"

    if (logoutBtn)
      logoutBtn.style.display = "inline"

  }
  else {

    loginLink.style.display = "inline"

    if (adminLink)
      adminLink.style.display = "none"

    if (logoutBtn)
      logoutBtn.style.display = "none"

  }

}

updateMenu()


/*
PROTECT ADMIN PAGE
*/

function protectAdminPage() {

  const token = localStorage.getItem("token")

  if (window.location.pathname.includes("admin.html") && !token) {

    alert("You must login first")

    window.location.href = "login.html"

  }

}

protectAdminPage()


/*
LOAD NEEDS
*/

async function loadNeeds() {

  const res = await fetch("/needs")

  const data = await res.json()

  const list = document.getElementById("needsList")

  if (!list) return

  list.innerHTML = ""

  data.forEach(n => {

    const li = document.createElement("li")

    li.textContent = n.title

    list.appendChild(li)

  })

}

/*
ADD NEED
*/

async function addNeed() {

  const title = document.getElementById("newNeed").value

  const token = localStorage.getItem("token")

  const res = await fetch("/needs", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      "Authorization": "Bearer " + token

    },

    body: JSON.stringify({ title })

  })

  const data = await res.json()

  if (!res.ok) {

    alert(data.message)

    return

  }

  alert(data.message)
  window.location.href = "index.html"

}

/*
LOGOUT
*/
function logout() {
  localStorage.removeItem("token")

  alert("Logged out")

  window.location.href = "index.html"

}

loadNeeds();