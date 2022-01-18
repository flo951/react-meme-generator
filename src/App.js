import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);

  useEffect(() => {
    axios.get('https://api.memegen.link/templates').then((result) => {
      setData(result.data);
    });
  }, []);
  let options = [];
  for (let i = 0; i <= data.length - 1; i++) {
    options.push({
      value: data[i].name,
      label: data[i].name,
      icon: data[i].blank,
    });
  }
  console.log(options);

  return (
    <>
      <div></div>
      <div>
        <label>
          Top Text:
          <input value={top}></input>
        </label>
        <label>
          Bottom Text:
          <input value={bottom}></input>
        </label>
      </div>
    </>
  );
}

export default App;
