import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import Bingo from './pages/bingo/bingo';
import ReactForm from './pages/reactForm/reactForm';
import Users from './pages/users/user';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { getUserToken } from './utils/localStorage.utils';
import Logout from './pages/logout/logout';
import { useState } from 'react';

const queryClient = new QueryClient()

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const token = getUserToken();
  console.log(token);
  const isLogged = !!token;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/*<Bingo />*/}
        {!isLogged && <Login forceUpdate={() => {setForceUpdate(!forceUpdate)}} />}
        {!isLogged && <Register forceUpdate={() => {setForceUpdate(!forceUpdate)}}/>}
        
        {isLogged && <Logout forceUpdate={() => {setForceUpdate(!forceUpdate)}}/>}
        <Users token={token}/>
        {/* <ReactForm /> */}
      </div>
    </QueryClientProvider>
  );
};

export default App
