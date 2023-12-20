import RootRoutes from './routes/RootRoutes';
import Providers from './components/Providers';
import styles from './App.module.scss';

function App() {
  return (
    <Providers>
      <RootRoutes />
    </Providers>
  );
}

export default App;
