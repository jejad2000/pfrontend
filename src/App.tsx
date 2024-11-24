import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <SnackbarProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <main className="p-4">
              <AppRoutes />
            </main>
          </div>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
