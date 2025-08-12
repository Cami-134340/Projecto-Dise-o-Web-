import { servidor } from "./config.js"
// GET POST PUT DELETE
// request response
// Ruta, funcion ()=>{ }

servidor.get("/",(req,res)=>{
    res.render("index.hbs")
})