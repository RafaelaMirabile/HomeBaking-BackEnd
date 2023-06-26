import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import { subscribeRouter } from "./routes/subscribe-router.js";
import { loginRouter } from './routes/login-router.js';
import userDecoration from './pluggins/userDecoration.js'
import { transactionsRouter } from './routes/transaction-router.js';

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    await server.register(userDecoration);
    
    server.route(subscribeRouter);
    server.route(loginRouter);
    server.route(transactionsRouter);

    await server.start();
    console.log(`Server running on ${process.env.PORT}`, server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();