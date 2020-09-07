import http from 'http'
import Debug from 'debug'
import app from './app'

const PORT = 3000
const debug = new Debug('platzi-overflow:root')

//declare with arrow function
//Hacer que mi app escuche en el puerto que le dijimos
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})