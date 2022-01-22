import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const divContainer = css`
  display: flex;

  justify-content: center;
`;

const divStyles = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 2rem;
  padding: 2rem;
  background-color: #a6d6ed;
  border-radius: 10px;
  width: 50vw;
`;
const inputStyles = css`
  margin: 5px;
  padding: 5px;
`;
const divInputs = css`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
`;
const imageStyles = css`
  height: 12rem;
  width: 12rem;
  margin: 10px;
`;
const selecStyles = css`
  width: 12rem;
`;
const divButtons = css`
  display: flex;
  flex-direction: column;
`;

const buttons = css`
  margin: 10px;
`;

function App() {
  const [templates, setTemplates] = useState([]);
  const [top, setTop] = useState('milk');
  const [bottom, setBottom] = useState('no good');
  const [meme, setMeme] = useState('badchoice');
  const temp = 'https://api.memegen.link/images/aag.png';

  function fetchTemplates() {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const memes = templates.map((e) => ({
    id: e.id,
    name: e.name,
  }));

  // const memeList = [];
  // memes.forEach(function (element) {
  //   memeList.push({ id: element, name: element });
  // });
  // console.log(memeList);

  const handleMeme = (e) => {
    setMeme(e.target.value);

    const selectBox = document.getElementById('dropdown');
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  };
  // function handleChange(e) {
  //   setState({ value: e.target.value });
  // }
  const memeDownload =
    temp.slice(0, -7) + meme + '/' + top + '/' + bottom + '.png';
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
              // needs onChange handler
              <option key={item.name} value={item.id}>
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
            Top Text
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
            Bottom Text
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
            Meme
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
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
