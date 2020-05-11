import React from 'react';
import Routes from './routes';
import './global.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'top-right',
  autoClose: 5000,
});

const App: React.FC = () => {
  return <Routes />;
}

export default App;
