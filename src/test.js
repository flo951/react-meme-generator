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
// const temp = 'https://api.memegen.link/images/buzz.png';
// function TemplateMeme() {
//   return (
//     <>
//       <div>
//         <img
//           css={imageStyles}
//           alt="jo"
//           src={temp.slice(37, 40) + '/' + top + '/' + bottom + '.png'}
//         />
//       </div>
//       <div />
//     </>
//   );
// }

function App() {
  const [data, setData] = useState([]);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates')
      .then((result) => {
        // get id blank from data and map over it

        setData(result.data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  // async function getWebsite(siteUrl) {
  //   try {
  //     // Get HTML of the website with axios
  //     const { data } = await axios.get(siteUrl);
  //     setTemplates(data);
  //     console.log(templates);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // loop is weird, need to change the code, the page rerenders too much. also with every onchange event
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

  return (
    <>
      <DisplayImages />
      <select>
        <option>Choose Template</option>
      </select>

      <div css={divStyles}>
        <h2>Create your own meme</h2>

        <label>
          Top Text: {top}
          <input
            css={inputStyles}
            value={top}
            onChange={(event) => {
              setTop(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Bottom Text: {bottom}
          <input
            css={inputStyles}
            value={bottom}
            onChange={(event) => {
              setBottom(event.currentTarget.value);
            }}
          />
        </label>
        <div>
          <button>Create Meme</button>

          <button>Download Meme</button>
        </div>
      </div>
    </>
  );
}

export default App;
