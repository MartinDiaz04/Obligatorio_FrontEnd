import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { spinnerCargando } from '../features/spinnerSlice'
import Spinner from './Spinner'

const Login = () => {
  const dispatch = useDispatch()
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
  const usuarioCarga = useSelector(state => state.spinner.loading)


  const loginUsuario = () => {
    dispatch(spinnerCargando(true))
    fetch(url + "/login.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario.current.value,
        password: pass.current.value,
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
        dispatch(spinnerCargando(false))
      }).catch((error) => {
        dispatch(spinnerCargando(false))
        setError(true)
        setMensajeError("Error en la conexión con el servidor")
      })
  }

  return (

    <div className='d-flex justify-content-center divForm'>
      <div className="row w-25 p-4 shadow-sm rounded bg-white border">
        <div className="d-flex justify-content-center mb-3">
          <h1 className="text-center">Iniciar Sesión</h1>
        </div>
        <input className="form-control p-2 my-2" type="text" name="usuario" ref={usuario} onChange={verificarCampos} placeholder='Ingrese usuario' />
        <input className="form-control p-2 my-2" type="password" name="pass" ref={pass} onChange={verificarCampos} placeholder='Ingrese contraseña' />
        <div className='d-flex mt-3 justify-content-center'>
          <Link className="btn btn-secondary me-2 mb-4" to="/">Atras</Link>
          <input className="btn btn-primary mb-4" disabled={!botonLogin} type="button" value="Iniciar Sesión" onClick={loginUsuario} />
        </div>
        {error ? <p className="text-center mt-3 text-danger">{mensajeError}</p> : null}
        {usuarioCarga ? <Spinner/> : null}
      </div>
    </div>




  )
}

export default Login
