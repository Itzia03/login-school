const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())
app.use(express.static("public"))

const SECRET = "supersecretkey"

let users = []

let needs = [
  { id: 1, title: "Food for families" },
  { id: 2, title: "School supplies" }
]

/*
REGISTER
*/

app.post("/register", (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    })
  }

  const exists = users.find(u => u.username === username)

  if (exists) {
    return res.status(400).json({
      message: "User already exists"
    })
  }

  users.push({ username, password })

  res.json({
    message: "User registered successfully"
  })
})

/*
LOGIN
*/

app.post("/login", (req, res) => {

  const { username, password } = req.body

  const user = users.find(u =>
    u.username === username && u.password === password
  )

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    })
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" })

  res.json({
    message: "Login successful",
    token
  })
})

/*
GET NEEDS
*/

app.get("/needs", (req, res) => {
  res.json(needs)
})

/*
JWT MIDDLEWARE
*/

function verifyToken(req, res, next) {

  const header = req.headers.authorization

  if (!header) {
    return res.status(403).json({
      message: "Authentication token required"
    })
  }

  const token = header.split(" ")[1]

  try {

    const decoded = jwt.verify(token, SECRET)

    req.user = decoded

    next()

  } catch {

    res.status(401).json({
      message: "Invalid or expired token"
    })

  }
}

/*
ADD NEED (ADMIN)
*/

app.post("/needs", verifyToken, (req, res) => {

  const { title } = req.body

  if (!title) {
    return res.status(400).json({
      message: "Need title is required"
    })
  }

  const newNeed = {
    id: needs.length + 1,
    title
  }

  needs.push(newNeed)

  res.json({
    message: "Need added successfully",
    need: newNeed
  })
})

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001")
})