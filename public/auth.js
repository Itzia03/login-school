async function register() {

  const username = document.getElementById("username").value

  const password = document.getElementById("password").value

  const res = await fetch("/register", {

    method: "POST",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify({ username, password })

  })

  const data = await res.json()

  if (!res.ok) {

    alert(data.message)

    return

  }

  alert(data.message)
  window.location.href = "index.html"

}


async function login() {

  const username = document.getElementById("username").value

  const password = document.getElementById("password").value

  const res = await fetch("/login", {

    method: "POST",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify({ username, password })

  })

  const data = await res.json()

  if (!res.ok) {

    alert(data.message)

    return

  }

  localStorage.setItem("token", data.token)

  alert(data.message)

  window.location.href = "admin.html"

}