const app = require('./src/app');

const server = app.listen(3002, () => {
    console.log('Express running → PORT 3002');
    });

process.on('SIGINT', () => {
    console.log('Bye bye!');
    server.close();
    process.exit();
    });