import path from 'path'
import express from 'express'
import db from '../db/index.mjs'
import { findByKey } from '../utils/index.mjs'

const app = express()
const PORT = 3000
const __dirname = path.resolve();

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use('/public/stylesheets', express.static(__dirname + '/public/stylesheets'))

app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/api/session/login', (req, res) => {
  const {email, password} = req.body
  const user = findByKey(db, email)

  if (!user || !password) {
    return res.send(404)
  }

  if (password === user.password) {
    res.send(200)
  } else {
    res.send(500)
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))