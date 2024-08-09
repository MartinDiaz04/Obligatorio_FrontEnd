import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Menu from './componentes/Menu';
import Dashboard from './componentes/Dashboard';
import NavBar from './componentes/NavBar';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<NavBar />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
