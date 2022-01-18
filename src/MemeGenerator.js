const componentDidMount = () => {
  fetch('https://api.memegen.link/templates/')
    .then((response) => response.json())
    .then((response) => {
      const { memes } = response.data;
    });
};
