const express = require('express');
const app = express();
const PORT  = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT}`);
});
