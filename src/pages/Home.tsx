import { useHistory } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const { signInWithGoogle, user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google icon" />
            Create your room with Google
          </button>
          <div className="separator">or enter in a room</div>
          <form>
            <input 
              type="text"
              placeholder="Type the room's code"
            />
            <Button type="submit">
              Enter the room
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}