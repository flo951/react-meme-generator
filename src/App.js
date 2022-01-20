import { useEffect, useState } from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const divStyles = css`
  height: 200px;
  width: 200px;
  margin: 30px;
  padding: 20px;
`;
const inputStyles = css`
  margin: 10px;
  padding: 5px;
`;
const imageStyles = css`
  height: 50px;
  width: 50px;
`;

function App() {
  const [data, setData] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const options = [];
  for (let i = 0; i <= data.length - 1; i++) {
    options.push({
      value: data[i].name,
      label: data[i].name,
      icon: data[i].blank,
    });
  }

  function DisplayImages() {
    const images = options.map(function (props) {
      return (
        <img
          css={imageStyles}
          alt={props.label}
          key={props.value}
          src={props.icon}
        />
      );
    });
    return images;
  }

  function GenerateMeme() {
    return null;
  }

  return (
    <>
      <DisplayImages />
      <select>
        <option>Choose Template</option>
      </select>

      <div css={divStyles}>
        <h2>Templates</h2>
        <button>Choose Meme</button>
      </div>
      <div css={divStyles}>
        <h2>Create your own meme</h2>
        <label>
          Top Text:
          <input
            css={inputStyles}
            value={top}
            onChange={(event) => {
              setTop(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Bottom Text:
          <input
            css={inputStyles}
            value={bottom}
            onChange={(event) => {
              setBottom(event.currentTarget.value);
            }}
          />
        </label>
        <button>Create Meme</button>
        <button>Download Meme</button>
      </div>
    </>
  );
}

export default App;
