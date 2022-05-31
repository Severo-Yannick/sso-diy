import path from 'path'
import express from 'express'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', './src/views')

app.get('/', (req, res) => {
  res.render('login')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))