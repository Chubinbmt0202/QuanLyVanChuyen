const app = require('./src/app');

const server = app.listen(3000, () => {
    console.log('Express running → PORT 3000');
    });

process.on('SIGINT', () => {
    console.log('Bye bye!');
    server.close();
    process.exit();
    });