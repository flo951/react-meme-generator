import './App.css';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const divContainer = css`
  display: flex;
  justify-content: center;
  color: white;
  background-color: #303030;
  width: 100vw;
  height: 100vh;
`;

const divStyles = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  padding: 2rem;
  background-color: #303030;
  border-radius: 10px;

  h3 {
    margin-bottom: 24px;
  }
`;
const inputStyles = css`
  margin: 6px;
  padding: 6px;
  width: 14rem;
`;
const divInputs = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const imageStyles = css`
  height: 14rem;
  width: 14rem;
  margin: 12px;
`;
const selecStyles = css`
  width: 14rem;
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
  width: 14rem;
  cursor: pointer;
  :hover {
    background-color: white;
    color: black;
    transition: all 0.7s ease-out;
  }
  h2 {
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
      // then((data) => setTemplates)
      .catch((error) => console.log(error));
  }, []);
  console.log(templates);

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

    // const handleSpace = e => {
    //   let text = e.target.value;

    //   text = text.replace(/[\D]+/g, " ");

    //   this.setTop({ value: text });
    // };

    const selectBox = document.getElementById('dropdown');
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    console.log(selectedValue);
  };
  // function handleChange(e) {
  //   setState({ value: e.target.value });
  // }

  // add ternary to display meme even when input is empty

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

  // const replaceSpace = () => {
  //   if (top.indexOf(' ') > -1) {
  //     let string = '';
  //     string = top.replace(/ /g, '_');
  //     setTop(top);
  //   }
  // };

  return (
    <div css={divContainer}>
      <div css={divStyles}>
        <h3>Create your own meme</h3>
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
            <h2>⬇︎ Download</h2>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
