const connectToMongo=require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo(); //always at the top

const app = express()
const port = 5000

app.use(cors())
//its use to send the req.body   important lines
app.use(express.json())

//available routing 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`inotebook backend  listening at http://localhost:${port}`)
})