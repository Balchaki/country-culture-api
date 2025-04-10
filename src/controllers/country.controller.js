const logger = require('../utils/logger');

exports.country = async (req, res) => {
    const country = req.query.name;
    if(country === undefined || country === null || country === ''){
        logger.error('parameter name is missing or empty');
        return res.status(500).json({message: 'Parameter name is missing or empty.'})
    }
}
