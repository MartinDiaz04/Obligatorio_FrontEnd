import { useDispatch, useSelector } from "react-redux";
import { guardarCategorias } from "../features/categoriaSlice";
import { guardarEventos } from "../features/eventoSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgregarEvento from "./eventos/AgregarEvento";
import ListarEventosHoy from "./eventos/ListarEventosHoy";
import ListarEventosAnteriores from "./eventos/ListarEventosAnteriores";
import BiberonesConsumidos from "./eventos/BiberonesConsumidos";
import PañalesCambiados from "./eventos/PañalesCambiados";
import CantCategorias from "./graficas/CantCategorias";
import CantComidas from "./graficas/CantComidas";
import TiempoParaBiberon from "./TiempoParaBiberon";

const Dashboard = () => {
  const url = "https://babytracker.develotion.com/"
  const userId = localStorage.getItem("userId")
  const apikey = localStorage.getItem("apiKey")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const eventos = useSelector(state => state.evento.listaEventos)
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
    }
  }, [])



  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-4 d-flex justify-content-center">
          <AgregarEvento />
        </div>
        <div className="col-4 d-flex">
          <ListarEventosHoy />
        </div>
        <div className="col-4 d-flex">
          <ListarEventosAnteriores />
        </div>
      </div>
      <div className="row">
        <div className="col-6 d-flex justify-content-center">
          <BiberonesConsumidos />
        </div>
        <div className="col-6 d-flex justify-content-center">
          <PañalesCambiados />
        </div>
        <div className="col-6 d-flex justify-content-center">
          <CantCategorias />
        </div>
        <div className="col-6 d-flex justify-content-center">
          <CantComidas />
        </div>
      </div>
      <div className="row mb-4 justify-content-center">
        <div className="col-6 d-flex justify-content-center">
          <TiempoParaBiberon />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
