import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import { Button } from "../components/Button";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');
  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Enter the name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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