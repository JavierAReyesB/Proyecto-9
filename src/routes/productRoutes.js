const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// Ruta para obtener productos
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../data/products.json')

  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return res.status(200).json(products)
  } else {
    return res.status(404).json({ message: 'No products found' })
  }
})

module.exports = router
