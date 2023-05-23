import { app } from './app'

app.listen(
  { host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 5000 },
  (error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    } else {
      process.send && process.send('ready')
    }
  },
)
