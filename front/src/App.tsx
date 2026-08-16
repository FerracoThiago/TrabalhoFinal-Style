import { Header } from './components/Header';
import { Cadastro } from './pages/Cadastro/Cadastro';

export function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Cadastro />
      </main>
    </div>
  );
}

export default App;