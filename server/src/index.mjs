import path from 'path'
import express from 'express'

const app = express()
const PORT = 3000
const __dirname = path.resolve();

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
);

app.get('/', (req, res) => {
  res.render('login')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))