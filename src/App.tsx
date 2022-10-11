import React, { useEffect, useState } from 'react';
import { Number } from './components/types/Number';
import './App.css';
import { Card } from './components/Card/Card';

function getRandomNumber (min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime (x: number): boolean {
  const maxDivider = Math.sqrt(x);

  for (let i = 2; i <= maxDivider; i++) {
    if (x % i === 0) {
      return false;
    }
  };

  return true;
};

export const App: React.FC = () => {
  const [numbers, setNumbers] = useState<Number[]>([]);
  const [visibleNumbersById, setVisibleNumbersById] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let arr = new Array(16);
    const indexes = new Array(32);

    for (let i = 0; i < indexes.length; i++) {
      let number = getRandomNumber(0, 31);

      if (!indexes.includes(number)) {
        indexes[i] = number;
      } else {
        number = getRandomNumber(2, 59);
        i--;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      let number = getRandomNumber(2, 59);

      if (isPrime(number) && !arr.includes(number)) {
        arr[i] = number;
      } else {
        number = getRandomNumber(2, 59);
        i--;
      }
    }

    arr = [...arr, ...arr]
      .map((number, i) => ({
        number,
        id: indexes[i],
        isVisible: true,
      }))
      .sort((x, y) => x.id - y.id);

    setNumbers(arr);

    setTimeout(() => {
      setNumbers(prev => prev.map(el => ({
        ...el,
        isVisible: false,
      })));

      setIsStarted(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (visibleNumbersById.length === 2) {
      const number1 = numbers.find(number => number.id === visibleNumbersById[0]);
      const number2 = numbers.find(number => number.id === visibleNumbersById[1]);

      if (number1?.number === number2?.number) {
        setNumbers(prev => prev.map(el => {
          if (visibleNumbersById.includes(el.id)) {
            return ({
              ...el,
              isVisible: true,
            });
          }

          return el;
        }));

        setVisibleNumbersById([]);
      } else {
        setTimeout(() => {
          setVisibleNumbersById([]);
        }, 1000);
      }
    }
  }, [visibleNumbersById]);

  return (
    <div className="App">
      <h1 className='title'>Mahjong</h1>

      <div className='cards'>
        {numbers.map((number) => (
          <Card
            number={number}
            key={number.id}
            visibleNumbersById={visibleNumbersById}
            setVisibleNumbersById={setVisibleNumbersById}
            isStarted={isStarted}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
