import { useDispatch, useSelector } from "react-redux";
import { guardarCategorias } from "../features/categoriaSlice";
import { guardarPlazas } from "../features/plazaSlice";
import { guardarEventos } from "../features/eventoSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgregarEvento from "./eventos/AgregarEvento";
import ListarEventos from "./eventos/ListarEventosHoy";
import ListarEventosAnteriores from "./eventos/ListarEventosAnteriores";
import BiberonesConsumidos from "./eventos/BiberonesConsumidos";
import PañalesCambiados from "./eventos/PañalesCambiados";

const Dashboard = () => {
  const url = "https://babytracker.develotion.com/"
  const userId = localStorage.getItem("userId")
  const apikey = localStorage.getItem("apiKey")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useEffect para cargar plazas, eventos y categorias en los estados
  useEffect(() => {
    if (localStorage.getItem("userId") === null || localStorage.getItem("apiKey") === null) {
      navigate("/")
    } else {
      // Guardo eventos
      fetch(url + "/eventos.php?idUsuario=" + userId, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "apikey": apikey,
          "iduser": userId
        },
      })
        .then((r) => r.json())
        .then((data) => {         
          dispatch(guardarEventos(data.eventos))
        })
      // Guardo categorias
      fetch(url + "/categorias.php", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "apikey": apikey,
          "iduser": userId
        },
      })
        .then((r) => r.json())
        .then((data) => {                    
          dispatch(guardarCategorias(data.categorias))
        })
      // Guardo plazas
      fetch(url + "/plazas.php", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "apikey": apikey,
          "iduser": userId
        },
      })
        .then((r) => r.json())
        .then((data) => {
          dispatch(guardarPlazas(data.plazas))
        })
    }

  }, [])


  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center">
        <AgregarEvento />
      </div>
      <div className="text-center">
        <ListarEventos />
      </div>
      <div className="text-center">
        <ListarEventosAnteriores />
      </div>
      <div className="text-center">
        <BiberonesConsumidos />
      </div>
      <div className="text-center">
        <PañalesCambiados />
      </div>
    </div>
  )
}

export default Dashboard
