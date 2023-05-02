const { PORT } = require("../constants");

const listen = (app) =>
  app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`);
  });

module.exports = listen;
