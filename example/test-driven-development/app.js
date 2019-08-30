const app = require("./index");

const port = 4002;
app.listen(port, () => {
    console.log('Server Running, PORT :' + port);
});