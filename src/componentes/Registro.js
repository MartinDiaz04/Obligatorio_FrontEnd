import React, { useEffect, useRef, useState } from "react";

const Registro = () => {
  const url = "https://babytracker.develotion.com/";
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const usuario = useRef(null);
  const pass = useRef(null);
  const departamentoActual = useRef(null);
  const ciudad = useRef(null);

  useEffect(() => {
    fetch(url + "/departamentos.php")
      .then((r) => r.json())
      .then((data) => {
        setDepartamentos(data.departamentos || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const obtenerCiudades = () => {
    fetch(url + "/ciudades.php?idDepartamento=" + departamentoActual.current.value)
      .then((r) => r.json())
      .then((data) => {
        setCiudades(data.ciudades || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verificarUsuario = () => {
    if (!usuario.current.value) {
      throw new Error("El usuario no puede estar vacío");
    }
    if (!pass.current.value) {
      throw new Error("La contraseña no puede estar vacía");
    }
  };

  const registrarUsuario = () => {
    verificarUsuario();
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
        localStorage.setItem("apiKey", data.token);
        localStorage.setItem("id", data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center">
        <label className="text-center mt-3" htmlFor="usuario">Ingrese usuario</label>
        <input className="col-6 p-2" type="text" name="usuario" ref={usuario}></input>
        <label className="text-center mt-3" htmlFor="pass">Ingrese clave</label>
        <input className="col-6 p-2" type="password" name="pass" ref={pass}></input>
        <label className="text-center mt-3" htmlFor="departamento">Seleccione departamento:</label>
        <select className="col-6 text-center p-2" onChange={obtenerCiudades} ref={departamentoActual} name="departamentos">{departamentos.map(departamento => (<option key={departamento.id} value={departamento.id}>{departamento.nombre}
        </option>))}
        </select>
        <label className="text-center mt-3" htmlFor="ciudades">Seleccione ciudad:</label>
        <select className="col-6 text-center p-2" name="ciudades" ref={ciudad}>{ciudades.map((ciudad) => (<option key={ciudad.id} value={ciudad.id}> {ciudad.nombre}</option>))}</select>
        <label htmlFor="boton"></label>
        <input className="mt-3 col-1 p-2" name="boton" type="button" value="Registrar" onClick={registrarUsuario} />
      </div>
    </div>
  );
};

export default Registro;
