import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Registro/>
    </Provider>
  );
}

export default App;
