import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarDepartamentos } from "../features/departamentoSlice";
import { guardarCiudades } from "../features/ciudadSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { spinnerCargando } from '../features/spinnerSlice'
import Spinner from './Spinner'

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
  const usuarioCarga = useSelector(state => state.spinner.loading)

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
      dispatch(spinnerCargando(true))
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
          dispatch(spinnerCargando(false))
        })
    } else {
      setError(true);
      setMensajeError("Debe completar todos los campos")
      dispatch(spinnerCargando(false))
    }

  };

  return (
    <div className='d-flex justify-content-center divForm'>
      <div className="row w-25 p-4 border rounded shadow bg-light">
        <div className="d-flex justify-content-center mb-3">
          <h1 className="text-center">Registro</h1>
        </div>
        <input className="form-control p-2 my-2" type="text" name="usuario" ref={usuario} placeholder="Ingrese usuario" />
        <input className="form-control p-2 my-2" type="password" name="pass" ref={pass} placeholder="Ingrese contraseña" />
        <label className="form-label mt-3" htmlFor="departamento">Seleccione departamento:</label>
        <select className="form-select p-2" onChange={obtenerCiudades} ref={departamentoActual} name="departamentos">
          {departamentos.map(departamento => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nombre}
            </option>
          ))}
        </select>
        <label className="form-label mt-3" htmlFor="ciudades">Seleccione ciudad:</label>
        <select className="form-select p-2" name="ciudades" ref={ciudad}>
          {ciudades.map(ciudad => (
            <option key={ciudad.id} value={ciudad.id}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
        <div className='d-flex mt-4 justify-content-center'>
          <Link className="btn btn-secondary me-2" to="/">Atras</Link>
          <input className="btn btn-primary" name="boton" type="button" value="Registrar" onClick={registrarUsuario} />
        </div>
        {error && <p className="text-center mt-3 text-danger">{mensajeError}</p>}
      </div>
    </div>


  );
};

export default Registro;
