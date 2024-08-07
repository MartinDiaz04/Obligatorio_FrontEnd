import React from 'react'
import { useRef } from 'react'

const Login = () => {
    const url = "https://babytracker.develotion.com/";
    const usuario = useRef(null)
    const pass = useRef(null)

    const verificarCampos = () =>{
        if(usuario.current.value && pass.current.value){
            document.getElementById("botonLogin").disabled = false
        }
        if(!usuario.current.value || !pass.current.value){
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
            localStorage.setItem("apiKey", data.token);
            localStorage.setItem("id", data.id);            
          })
    }

  return (
    <div>
      <label htmlFor="usuario">Ingrese usuario</label>
      <input type="text" name="usuario" ref={usuario} onChange={verificarCampos}></input>
      <label htmlFor="pass">Ingrese clave</label>
      <input type="password" name="pass" ref={pass} onChange={verificarCampos}></input>
      <input type="button" value="Iniciar sesion" id='botonLogin' onClick={loginUsuario}/>
    </div>
  )
}

export default Login
