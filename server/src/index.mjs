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

app.use((req, res, next) => {
  const cookies = req.headers.cookie;

  req.cookies = {}

  if (!cookies)
    return next()

  const cookiesArray = cookies.split('; ')
  const parsedCookies = {}

  for (let cookie of cookiesArray) {
    const [key, value] = cookie.split('=')
    parsedCookies[key] = value
  }

  req.cookies = parsedCookies;

  next()
})

app.get('/', (req, res) => {
  if (req.cookies.sso_session) {
    res.render('logout')
  } else {
    res.render('login')
  }
})

app.get('/api/session', (req, res) => {
  res.render('session', {token : req.cookies.sso_session})
} )

app.post('/api/session/login', (req, res) => {
  const {email, password} = req.body
  const user = findByKey(db, email)

  if (!user || !password) {
    return res.send(404)
  }

  if (password === user.password) {
    res.cookie('sso_session', email, {
      sameSite: 'none',
      secure: true
    })
    .redirect('/api/session')
  } else {
    res.send(500)
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))