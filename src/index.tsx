import ReactDOM, { Root } from 'react-dom/client';
import App from './App';
import './stylesheets/global/index.css';

const root: Root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);