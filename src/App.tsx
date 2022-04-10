import './App.css';
import React, { useEffect, useState } from 'react';
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
  margin-top: 24px;
  display: flex;
  justify-content: center;
  width: 350px;

  flex-direction: column;
`;
const inputStyles = css`
  margin: 12px 0px;
  padding: 6px;

  width: 100%;
  margin-bottom: 24px;
`;

const imageStyles = css`
  height: 20rem;
  width: 350px;
  margin: 12px 0px;
`;
const selecStyles = css`
  padding: 8px;
  margin-bottom: 1rem;
`;

const buttons = css`
  background-color: #9a66e2;
  padding: 12px 6px;
  margin: 12px;
  border: none;
  border-radius: 28px;
  font-size: 24px;
  cursor: pointer;
  :hover {
    color: white;
    transition: all 0.3s ease-out;
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

  const memes = templates.map((templateMeme) => ({
    id: templateMeme.id,
    name: templateMeme.name,
  }));

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
        <select
          css={selecStyles}
          id="dropdown"
          onChange={(e) => {
            setMeme(e.target.value);
          }}
        >
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
        <div>
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

        <button css={buttons} onClick={() => saveAs(memeDownload, 'meme.jpg')}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
