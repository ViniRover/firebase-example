import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

interface QuestionProps {
  children?: ReactNode;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ 
  content, 
  author, 
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return(
    <div className={cx(
      'question',
      { answered : isAnswered },
      { highlighted : isHighlighted }
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}