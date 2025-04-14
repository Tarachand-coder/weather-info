import app from './middlewares/express.middleware';
import { vars } from './config/vars.config';
const { baseUrl, port, env } = vars;

class Server {
    static async start() {
        app.listen(port, () => {
            console.log(`App listening on ${baseUrl}:${port} and env ${env}`)
        });
    }
}

Server.start();