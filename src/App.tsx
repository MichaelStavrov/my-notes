import RootRoutes from './routes/RootRoutes';
import AuthProvider from './context/AuthProvider';
import styles from './App.module.scss';

function App() {
  return (
    <AuthProvider>
      <RootRoutes />
    </AuthProvider>
  );
}

export default App;
