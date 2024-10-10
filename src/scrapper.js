const puppeteer = require('puppeteer')
const fs = require('fs')
const Product = require('./models/productModel')

async function scrapeWebsite() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.normacomics.com/comics/manga.html', {
    waitUntil: 'networkidle2'
  })

  try {
    await page.waitForSelector('.cb-enable', { timeout: 5000 })
    await page.click('.cb-enable')
    console.log('Modal de cookies cerrado.')
  } catch (error) {
    console.log('No se detectó modal de cookies o no se pudo cerrar.')
  }

  let allComicsData = []
  let hasNextPage = true

  while (hasNextPage) {
    const comicsData = await page.evaluate(() => {
      let comics = []
      const items = document.querySelectorAll('.product-item')

      items.forEach((item) => {
        const title = item
          .querySelector('.product-item-link')
          ?.textContent.trim()
        const price = item.querySelector('.price')?.textContent.trim()
        const imageUrl = item.querySelector('img')?.src

        if (title && price && imageUrl) {
          comics.push({ title, price, imageUrl })
        }
      })

      return comics
    })

    allComicsData = allComicsData.concat(comicsData)

    try {
      const nextButton = await page.$('.action.next')
      if (nextButton) {
        await Promise.all([
          page.click('.action.next'),
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 })
        ])
        console.log('Navegando a la siguiente página...')
      } else {
        console.log('No se detectó página siguiente. Terminando scraping.')
        hasNextPage = false
      }
    } catch (error) {
      console.log('Error navegando a la siguiente página:', error.message)
      hasNextPage = false
    }
  }

  fs.writeFileSync(
    './data/products.json',
    JSON.stringify(allComicsData, null, 2)
  )
  console.log('Scraping completado y guardado en products.json')

  try {
    await Product.insertMany(allComicsData)
    console.log('Todos los datos guardados en MongoDB.')
  } catch (error) {
    console.log('Error guardando en MongoDB:', error.message)
  }

  await browser.close()
}

module.exports = { scrapeWebsite }
