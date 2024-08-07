
import { Link } from "react-router-dom"


const Menu = () => {
    return (
        <div>
            <div className="d-flex justify-content-center my-5">
                <h1 className="">Baby Tracker</h1>
            </div>
            <div className="d-flex justify-content-center">
                <Link className="boton mx-5" to="registro">Registrarse</Link>
                <Link className="boton mx-5" to="login">Iniciar Sesion</Link>
            </div>
        </div>
    )
}

export default Menu
