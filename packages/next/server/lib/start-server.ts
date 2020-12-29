import http from 'http'
import next from '../next'

export default async function start(serverOptions: any, ...listenArgs: any[]) {
  const app = next({
    ...serverOptions,
    customServer: false,
  })
  const srv = http.createServer(app.getRequestHandler())
  await new Promise((resolve, reject) => {
    // This code catches EADDRINUSE error if the port is already in use
    srv.on('error', reject)
    srv.on('listening', () => resolve())
    srv.listen(...listenArgs)
  })
  // It's up to caller to run `app.prepare()`, so it can notify that the server
  // is listening before starting any intensive operations.
  return app
}
