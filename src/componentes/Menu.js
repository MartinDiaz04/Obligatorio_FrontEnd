import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"


const Menu = () => {
  return (
    <div id="menu">
        <Link className="boton" to="registro">Registrarse</Link>
        <Link className="boton" to="login">Iniciar Sesion</Link>
    </div>
  )
}

export default Menu
