import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import Bingo from './pages/bingo/bingo';
import ReactForm from './pages/reactForm/reactForm';
import Users from './pages/users/user';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/*<Bingo />*/}
        
        <Users />
        <ReactForm />
      </div>
    </QueryClientProvider>
  );
};

export default App
