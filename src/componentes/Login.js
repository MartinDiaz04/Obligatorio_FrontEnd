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
  const [botonLogin, setBotonLogin] = useState(false)
  const navigate = useNavigate()
  // Verifico campos para habilitar el boton de iniciar sesion
  const verificarCampos = () => {
    usuario.current.value && pass.current.value ? setBotonLogin(true) : setBotonLogin(false)
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
    <div className='d-flex justify-content-center'>
      <div className="row w-25 p-5" id='login'>
        <div className="d-flex justify-content-center mb-2">
          <h1 className="text-center">Iniciar Sesion</h1>
        </div>
        <input className="p-2 my-2" type="text" name="usuario" ref={usuario} onChange={verificarCampos} placeholder='Ingrese usuario'></input>
        <input className="p-2 my-2" type="password" name="pass" ref={pass} onChange={verificarCampos} placeholder='Ingrese contraseña'></input>
        <label htmlFor="botonlogin"></label>
        <div className='d-flex mt-2 justify-content-center'>
          <input className="mt-2 mx-2 p-2" disabled={!botonLogin} type="button" value="Iniciar Sesion" onClick={loginUsuario} />
          <Link className="text-center mt-2 mx-2 boton" to="/">Atras</Link>
        </div>
        {error ? <p className="text-center mt-5">{mensajeError}</p> : null}
      </div>
    </div>



  )
}

export default Login
