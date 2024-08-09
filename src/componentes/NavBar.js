import { NavLink, Outlet } from "react-router-dom"

const CerrarSesion = () => {
  const cerrarSesion = () => {
    localStorage.clear("apiKey")
  }

  return (
    <div>
      <nav className="navBar d-flex justify-content-between align-items-center">
        <h1 className="mx-5 text-center">Bienvenido/a</h1>
        <ul className="d-flex justify-content-end mb-0">
          <li className="mx-5">
            <NavLink className="" onClick={cerrarSesion} to="/">Cerrar Sesion</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default CerrarSesion
