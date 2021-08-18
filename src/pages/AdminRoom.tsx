import { useHistory, useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleEndRoom() {
    const authorId = await database.ref(`rooms/${roomId}`).get().then(room => {
      return room.val().authorId;
    });

    if(authorId !== user?.id) {
      alert('You do not have permission to end this room');
      return;
    }
    
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    const authorId = await database.ref(`rooms/${roomId}`).get().then(room => {
      return room.val().authorId;
    });

    if(authorId !== user?.id) {
      alert('You do not have permission to delete this question');
      return;
    }

    if(window.confirm('Do you wish to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>End discussion</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remove question" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}