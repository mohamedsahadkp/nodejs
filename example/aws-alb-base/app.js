const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
    request('https://api.com/health', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        //res.send(body);
      });

      res.send({'body':'dd'});
});


// request(process.env.ADMIN_HEALTH_URL, { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening Port : ${PORT}`);
})