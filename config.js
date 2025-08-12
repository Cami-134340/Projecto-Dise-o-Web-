import express from "express"
import hbs from "hbs"
import { fileURLToPath } from 'url'
import path from "path"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const servidor = express()
servidor.set("view engine", "hbs")
servidor.listen(80)

export {
    servidor
}