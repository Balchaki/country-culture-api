const app = require('./app');
const port = 3000;
const logger = require('./src/utils/logger');

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
})
