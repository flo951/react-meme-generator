import { useEffect, useState } from 'react';

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
const button = css`
  width: 8rem;
  margin: 10px;
  border: 1px black;
  border-radius: 5px;
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
  }));

  const memeList = [];
  memes.forEach(function (element) {
    memeList.push({ id: element, name: element });
  });
  console.log(memeList);
  export default memeList
  // <Select options={ technologyList } />
  function selectMeme() {
    return (
      <select>
        {memeList.forEach((element) => {
          <option value={element.id}>{element.name}</option>;
        })}
      </select>
    );
  }

  return (
    <div css={divStyles}>
      <h2>Create your own meme</h2>

      <div>
        <img
          css={imageStyles}
          alt="template"
          src={temp.slice(0, -7) + meme + '/' + top + '/' + bottom + '.png'}
        />
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
        <button css={button}>Create Meme</button>

        <button css={button}>Download Meme</button>
      </div>
    </div>
  );
}

export default App;
