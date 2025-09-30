import express  from "express";
import hbs from "hbs";
import path from "path";
import mysql from "mysql2";
import util from "util";
//--------------------------------------------------------
    import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
//---------------------------------------------------------

const servidor = express();

let pagina = path.join(__dirname, "views");
servidor.use(express.json());
servidor.use(express.static(path.join(__dirname, "public")));
servidor.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
servidor.use(express.urlencoded({ extended: true }));
servidor.listen(80);

export {servidor};