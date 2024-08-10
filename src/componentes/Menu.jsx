
import { Link } from "react-router-dom"


const Menu = () => {
    return (
        <div className="menu-container">
            <div className="d-flex justify-content-center  my-5">
                <h1 className="menu-title">Baby Tracker</h1>
            </div>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-secondary mx-3 d-flex justify-content-center align-items-center" to="registro">Registrarse</Link>
                <Link className="btn btn-secondary mx-3 d-flex justify-content-center align-items-center" to="login">Iniciar Sesion</Link>
            </div>
        </div>
    )
}

export default Menu
