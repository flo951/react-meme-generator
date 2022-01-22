import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const divStyles = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  padding: 20px;
  background-color: #a6d6ed;
  border-radius: 10px;
  width: 50%;
`;
const inputStyles = css`
  margin: 5px;
  padding: 5px;
`;
const imageStyles = css`
  height: 250px;
  width: 250px;
  margin: 10px;
`;
const selecStyles = css`
  width: 200px;
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
      .catch((err) => console.log('error'));
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

  const handleMeme = (e) => setMeme(e.target.value);

  // function handleChange(e) {
  //   setState({ value: e.target.value });
  // }
  const memeDownload =
    temp.slice(0, -7) + meme + '/' + top + '/' + bottom + '.png';
  return (
    <div css={divStyles}>
      <h2>Create your own meme</h2>
      <select value="dropdown" onChange={handleMeme}>
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
        <img css={imageStyles} alt="meme-template" src={memeDownload} />
      </div>

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
      <label>
        Meme:
        <input
          css={inputStyles}
          value={meme}
          onChange={(event) => {
            setMeme(event.currentTarget.value);
          }}
        />
      </label>
      <div css={divButtons}>
        <button css={buttons}>Create Meme</button>

        <button css={buttons} onClick={() => saveAs(memeDownload, 'meme.jpg')}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
