require('dotenv').config()
const express = require('express')
const { scrapeWebsite } = require('./src/scrapper')
const productRoutes = require('./src/routes/productRoutes')
const connectDB = require('./src/db')

const app = express()
app.use(express.json())

connectDB()

app.use('/api/products', productRoutes)

app.get('/scrape', async (req, res) => {
  try {
    await scrapeWebsite()
    res.status(200).json({ message: 'Scraping completado con éxito' })
  } catch (error) {
    res.status(500).json({ message: 'Fallo en el scraping', error })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
