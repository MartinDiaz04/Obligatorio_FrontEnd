import {useDispatch, useSelector} from "react-redux";
import { guardarCategorias } from "../features/categoriaSlice";
import { guardarPlazas } from "../features/plazaSlice";
import { guardarEventos } from "../features/eventoSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const url = "https://babytracker.develotion.com/"
  const eventos = useSelector(state => state.evento.listaEventos)
  const categorias = useSelector(state => state.categoria.listaCategorias)
  const plazas = useSelector(state => state.plaza.listaPlazas)
  const userId = localStorage.getItem("userId")
  const apikey = localStorage.getItem("apiKey")
  const dispatch = useDispatch()
  // useEffect para cargar plazas, eventos y categorias en los estados
  useEffect(()=>{
    // Guardo eventos
    fetch(url + "/eventos.php?idUsuario="+userId, {
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
  }, [])
  

  return (
    <div>
      <h1>hola</h1>
    </div>
  )
}

export default Dashboard
