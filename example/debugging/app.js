
const appDebugger = require('debug')('app:appDebugger');
const express = require('express');
const app = express();

if(app.get('env') === 'development') {
    appDebugger('Environemnt Logging');
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(` Listening Port : ${PORT}`);
})
