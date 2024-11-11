const express = require('express');
const app = express();
const port = 3000;
const apiRoutes = require('./src/routes/index.routes')
app.use(express.json());

app.use("/api",apiRoutes);

app.listen((port),()=>{
 console.log(`app is listening on ${port}`)
})