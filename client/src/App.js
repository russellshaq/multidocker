import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [number, setNumber] = useState();
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    try {
      const data = await fetch('/api/values');
      const json = await data.json();
      setNumbers(json.numbers);
    } catch (e) {
      console.log(e);
    }
  }

  const addNumber = async () => {
    try {
      const data = await fetch('/api/values', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number })
      })
      const json = await data.json();
      setNumbers([...numbers, json]);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => { fetchNumbers() }, [])
  return (
    <div className="App">
      <p>{numbers.map(n => n.number + ', ')}</p>
      <input type="number" onChange={(e) => setNumber(e.target.value)} />
      <button onClick={addNumber}>add</button>
    </div>
  );
}

export default App;
