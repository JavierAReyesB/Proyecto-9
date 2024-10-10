Proyecto 9 - Web Scrapping

Página Objetivo

Este proyecto realiza web scraping de productos desde la página [Norma Comics](https://www.normacomics.com/comics/manga.html), enfocándose en la sección de mangas. Todos los productos de esta sección, incluyendo su nombre, precio e imagen, se extraen y almacenan en un archivo `products.json` y también se suben a una base de datos MongoDB.

Instalación y Configuración:

Clona el repositorio:
git clone https://github.com/tu-usuario/proyecto-9-web-scrapping.git
Entra en el directorio del proyecto:
cd proyecto-9-web-scrapping

Instala las dependencias:
npm install

Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto con la siguiente variable:
DB_URL=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre-db>?retryWrites=true&w=majority

Ejecuta el servidor con el comando:
npm run dev

El proyecto utiliza Puppeteer para navegar por una página web con productos paginados y extraer información clave, como el título, precio e imagen de cada producto. Los datos extraídos se guardan en un archivo products.json y en una base de datos MongoDB.

Las rutas del API incluyen:

GET /api/products: Obtiene la lista de productos del archivo JSON.

_/ no se cual era el minimo de productos exigido pero supongo que con unos 10 mil bastara, porque tengo 50 mil lineas de codigo en productos, de lejos lo que mas me ha divertido hasta ahora /_
