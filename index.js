import { servidor } from "./config.js";
import bcrypt from "bcryptjs";
import validator from "validator";

const menu = [
    {nombre:"inicio",ruta:"/",icono:""},
    {nombre:"contacto",ruta:"/contacto",icono:""},
    {nombre:"carrito",ruta:"/carrito",icono:""}
];

// Usuarios precreados
const usuarios = [
  { nombre: "Cami", correo: "cami@ejemplo.com", contra: bcrypt.hashSync("1234", 10) },
  { nombre: "Tania", correo: "tania@ejemplo.com", contra: bcrypt.hashSync("abcd", 10) }
];

let carrito = [];

// Agregar al carrito
servidor.post("/carrito/agregar", (req, res) => {
  const producto = productos.find(p => p.id == req.body.id);
  if (producto) carrito.push(producto);
  res.redirect("/");
});

// Quitar del carrito
servidor.post("/carrito/quitar", (req, res) => {
  carrito = carrito.filter(p => p.id != req.body.id);
  res.redirect("/carrito");
});

// Ver carrito
servidor.get("/carrito", (req, res) => {
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  res.render("carrito", { carrito, total, menu, titulo: "Carrito" });
});

// Finalizar compra
servidor.post("/carrito/finalizar", (req, res) => {
  carrito = [];
  res.render("carrito", { carrito, total: 0, menu, titulo: "Carrito", mensaje: "Compra finalizada!" });
});


const productos = [
  { id: 1, nombre: "Sillón rojo", precio: 2500, descripcion: "Sillón de living rojo", imagen: "/imagenesProductos/sillonRojo.jpg" },
  { id: 2, nombre: "Espejo decorativo", precio: 1200, descripcion: "Espejo decorativo para pared", imagen: "/imagenesProductos/espejoDecorativo.jpg" },
  { id: 3, nombre: "Lámpara azul", precio: 1800, descripcion: "Lámpara de mesa", imagen: "/imagenesProductos/lamparaAzul.jpg" },
  { id: 4, nombre: "Mesa de madera", precio: 5500, descripcion: "Mesa de madera 2m", imagen: "/imagenesProductos/mesaMadera.jpg" },
  { id: 5, nombre: "Mesa negra", precio: 4050, descripcion: "Mesa negra 1m", imagen: "/imagenesProductos/mesaNegra.jpg" }
];

// RUTAS

// Ruta principal
servidor.get("/", (req, res) => {
  res.render("index", { menu, titulo: "Inicio", carrito, productos });
});

// Ruta carrito
servidor.get("/carrito", (req, res) => {
  res.render("carrito.hbs", { menu, carrito });
});

// Ruta contacto
servidor.get("/contacto", (req, res) => {
  res.render("contacto.hbs", { menu });
});


// Login
servidor.get("/login", (req, res) => {
  res.render("login", { menu, titulo: "Login" });
});

servidor.post("/login", (req, res) => {
  const { correo, contra } = req.body;
  const usuario = usuarios.find(u => u.correo === correo);

  if (!usuario) {
    return res.render("login", { menu, titulo: "Login", error: "Correo no registrado" });
  }

  const valido = bcrypt.compareSync(contra, usuario.contra);
  if (!valido) {
    return res.render("login", { menu, titulo: "Login", error: "Contraseña incorrecta" });
  }

  res.redirect("/");
});


/* CONEXIÓN A BASE DE DATOS

// Configuración de la conexión MySQL
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
})

// Promisificar los métodos de conexión
const connectar = util.promisify(conexion.connect).bind(conexion)
const query = util.promisify(conexion.query).bind(conexion)

// Función para conectar a la base de datos
async function inicializarBaseDeDatos() {
    try {
        await connectar()
        console.log("Conectado a la base de datos MySQL")
    } catch (error) {
        console.error("Error al conectar a MySQL:", error)
    }
}

// Inicializar la base de datos
inicializarBaseDeDatos();

// Cerrar conexión al terminar
process.on('SIGINT', () => {
    conexion.end();
    process.exit();
})

*/