import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import { AdminRoom } from './pages/AdminRoom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Home} exact/>    
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
