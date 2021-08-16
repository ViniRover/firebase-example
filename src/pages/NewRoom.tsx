import { Link } from 'react-router-dom';

import { Button } from "../components/Button";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
// import { useAuth } from '../context/AuthContext';

export function NewRoom() {
  // const { user } = useAuth();

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Create a Q&amp;A live room</strong>
        <p>Answer questions of your audience live</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask logo" />
          <h2>Create a new room</h2>
          <form>
            <input 
              type="text"
              placeholder="Enter the name"
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>
            Already have a code to an existing room?
            <Link to="/"> Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}