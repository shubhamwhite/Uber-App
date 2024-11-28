const app = require('./src/app')
const config = require('./src/config/general.config')
const clc = require('./src/helper/cliColor.helper')
const connectToDb = require('./src/models')

// Port connect
app.listen(config.PORT, (error) => {
  connectToDb()
  const PORT = config.PORT
  if (error) {
    console.log('port connection failed')
  } else {
    console.log(clc.success(`\nUser service run on ${PORT} port number 🚀`))
  }
})
