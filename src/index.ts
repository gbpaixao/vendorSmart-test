import express from "express";

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
  res.send('API is running')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})