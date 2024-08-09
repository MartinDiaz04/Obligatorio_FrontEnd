import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarDepartamentos } from "../features/departamentoSlice";
import { guardarCiudades } from "../features/ciudadSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const url = "https://babytracker.develotion.com/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useRef(null);
  const pass = useRef(null);
  const departamentoActual = useRef(null);
  const ciudad = useRef(null);
  const departamentos = useSelector(state => state.departamento.listaDepartamentos)
  const ciudades = useSelector(state => state.ciudad.listaCiudades)
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    fetch(url + "/departamentos.php")
      .then((r) => r.json())
      .then((data) => {
        dispatch(guardarDepartamentos(data.departamentos));
        // Guardo el primer departamento para que se carguen sus ciudades automaticamente
        departamentoActual.current.value = data.departamentos[0].id;
        obtenerCiudades();
      })
  }, []);

  const obtenerCiudades = () => {
    fetch(url + "/ciudades.php?idDepartamento=" + departamentoActual.current.value)
      .then((r) => r.json())
      .then((data) => {
        dispatch(guardarCiudades(data.ciudades));
      })
  };


  const verificarUsuario = () => {
    if (!usuario.current.value || !pass.current.value || pass.current.value.trim() == "" || usuario.current.value.trim() == "") {
      return false
    }
    return true;
  };

  const registrarUsuario = () => {
    if (verificarUsuario()) {         
      fetch(url + "/usuarios.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario.current.value,
          pass: pass.current.value,
          idDepartamento: departamentoActual.current.value,
          idCiudad: ciudad.current.value,
        })
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.codigo === 409) {
            setError(true);
          } else {
            localStorage.setItem("apiKey", data.apiKey);
            localStorage.setItem("userId", data.id);
            navigate("/dashboard");
          }
        })
    }else{
      setError(true);
      setMensajeError("Debe completar todos los campos")
    }

  };

  return (
    <div className='d-flex justify-content-center divForm'>
      <div className="row w-25 p-5 borde" >
        <div className="d-flex justify-content-center mb-2">
          <h1 className="text-center">Registro</h1>
        </div>
        <input className="p-2 my-2" type="text" name="usuario" ref={usuario} placeholder="Ingrese usuario"></input>
        <input className="p-2 my-2" type="password" name="pass" ref={pass} placeholder="Ingrese contraseña"></input>
        <label className="text-center mt-2" htmlFor="departamento">Seleccione departamento:</label>
        <select className="text-center p-2" onChange={obtenerCiudades} ref={departamentoActual} name="departamentos">{departamentos.map(departamento => (<option key={departamento.id} value={departamento.id}>{departamento.nombre}
        </option>))}
        </select>
        <label className="text-center mt-2" htmlFor="ciudades">Seleccione ciudad:</label>
        <select className="text-center p-2" name="ciudades" ref={ciudad}>{ciudades.map((ciudad) => (<option key={ciudad.id} value={ciudad.id}> {ciudad.nombre}</option>))}</select>
        <label htmlFor="boton"></label>
        <div className='d-flex mt-5 justify-content-center'>
          <Link className="text-center mt-2 mx-2 boton" to="/">Atras</Link>
          <input className="mt-2 mx-2 p-2" name="boton" type="button" value="Registrar" onClick={registrarUsuario} />
        </div>
        {error ? <p className="text-center mt-2">{mensajeError}</p> : null}
      </div>
    </div>


  );
};

export default Registro;
