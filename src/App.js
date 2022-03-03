import './App.css';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const divContainer = css`
  display: flex;
  justify-content: center;
  h2 {
    margin-bottom: 1rem;
  }
`;

const divStyles = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 100vh;

  display: flex;
  align-items: center;
  padding: 2rem;
  flex-direction: column;
`;
const inputStyles = css`
  margin: 6px;
  padding: 6px;
  width: 22rem;
  margin-bottom: 24px;
`;
const divInputs = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const imageStyles = css`
  height: 20rem;
  width: 22rem;
  margin: 12px;
`;
const selecStyles = css`
  width: 22rem;
  padding: 8px;
  margin-bottom: 1rem;
`;
const divButtons = css`
  display: flex;
  flex-direction: column;
  font-size: 40px;
`;

const buttons = css`
  background-color: #9a66e2;
  padding: 12px 12px;
  margin: 12px;
  border: none;
  border-radius: 28px;
  width: 22rem;
  cursor: pointer;
  :hover {
    background-color: white;
    color: black;
    transition: all 0.7s ease-out;
  }
  h3 {
    font-size: 28px;
  }
`;

function App() {
  const [templates, setTemplates] = useState([]);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [meme, setMeme] = useState('ants');
  const temp = 'https://api.memegen.link/images/aag.png';

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((r) => r.json())
      .then(setTemplates)
      .catch((error) => console.log(error));
  }, []);

  const memes = templates.map((e) => ({
    id: e.id,
    name: e.name,
  }));

  const handleMeme = (e) => {
    setMeme(e.target.value);
  };

  let memeDownload = temp.slice(0, -7) + meme + '.png';
  const topempty = '_';

  if (top && bottom) {
    memeDownload = temp.slice(0, -7) + meme + '/' + top + '/' + bottom + '.png';
  } else if (top && !bottom) {
    memeDownload = temp.slice(0, -7) + meme + '/' + top + '.png';
  } else if (bottom && !top) {
    memeDownload =
      temp.slice(0, -7) + meme + '/' + topempty + '/' + bottom + '.png';
  }

  return (
    <div css={divContainer}>
      <div css={divStyles}>
        <h2>Create your own meme</h2>
        <select css={selecStyles} id="dropdown" onChange={handleMeme}>
          <option key="template" value="meme-template">
            Select Meme Template
          </option>
          {memes.map((item) => {
            return (
              <option key={`meme-${item.name}`} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div>
          <img
            css={imageStyles}
            data-test-id="meme-image"
            alt="meme-template"
            src={memeDownload}
          />
        </div>
        <div css={divInputs}>
          <label>
            Top text
            <br />
            <input
              css={inputStyles}
              value={top}
              onChange={(event) => {
                setTop(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            Bottom text
            <br />
            <input
              css={inputStyles}
              value={bottom}
              onChange={(event) => {
                setBottom(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            Meme template
            <br />
            <input
              css={inputStyles}
              value={meme}
              onChange={(event) => {
                setMeme(event.currentTarget.value);
              }}
            />
          </label>
        </div>
        <div css={divButtons}>
          <button
            css={buttons}
            onClick={() => saveAs(memeDownload, 'meme.jpg')}
          >
            <h3>Download</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
