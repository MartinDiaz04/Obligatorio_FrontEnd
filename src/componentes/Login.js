import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const url = "https://babytracker.develotion.com/";
  const usuario = useRef(null)
  const pass = useRef(null)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    document.getElementById("botonLogin").disabled = true
  }, [])

  const verificarCampos = () => {
    if (usuario.current.value && pass.current.value) {
      document.getElementById("botonLogin").disabled = false
    }
    if (!usuario.current.value || !pass.current.value) {
      document.getElementById("botonLogin").disabled = true
    }
  }
  const loginUsuario = () => {
    fetch(url + "/login.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario.current.value,
        pass: pass.current.value,
      })
    })
      .then((r) => r.json())
      .then((data) => {

        if (data.codigo === 409) {
          setError(true)
          setMensajeError(data.mensaje)
        } else {
          localStorage.setItem("apiKey", data.apiKey);
          localStorage.setItem("userId", data.id);          
          navigate("/dashboard")
        }

      })
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center my-3">
          <h1 className="">Iniciar Sesion</h1>
        </div>
        <label className="text-center mt-3" htmlFor="usuario">Ingrese usuario</label>
        <input className="col-6 p-2" type="text" name="usuario" ref={usuario} onChange={verificarCampos}></input>
        <label className="text-center mt-3" htmlFor="pass">Ingrese clave</label>
        <input className="col-6 p-2" type="password" name="pass" ref={pass} onChange={verificarCampos}></input>
        <label htmlFor="botonlogin"></label>
        <input className="mt-2 col-3 mx-2 p-2" id="botonLogin" type="button" value="Iniciar Sesion" onClick={loginUsuario} />
        <Link className="text-center mt-2 mx-2 col-3 boton" to="/">Atras</Link>
        {error ? <p className="text-center mt-5">{mensajeError}</p> : null}
      </div>
    </div>
  )
}

export default Login
