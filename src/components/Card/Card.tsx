import React from 'react';
import { Number } from '../types/Number';
import './Card.css';
import classNames from 'classnames';

interface Props {
  number: Number
  visibleNumbersById: number[]
  setVisibleNumbersById: (value: React.SetStateAction<number[]>) => void
  isStarted: boolean
}

export const Card: React.FC<Props> = (props) => {
  const { number, visibleNumbersById, setVisibleNumbersById, isStarted } = props;

  const clickHandler = (id: number): void => {
    if (visibleNumbersById.length < 2 && !visibleNumbersById.includes(id)) {
      setVisibleNumbersById(prev => [...prev, id]);
    }
  };

  return (
    <div
      className={classNames('card', { visible: number.isVisible && isStarted }, { selected: visibleNumbersById.includes(number.id) })}
      onClick={() => clickHandler(number.id)}
    >
      <p className='number'>
        {(visibleNumbersById.includes(number.id) || number.isVisible) && number.number}
      </p>
    </div>
  );
};
