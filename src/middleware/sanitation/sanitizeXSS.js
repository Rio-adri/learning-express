const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMpurify = createDOMPurify(window);

const sanitizeXSS = (req, res, next) => {
    if(req.body.task) {
        req.body.task = DOMpurify.sanitize(req.body.task);
    }

    if(req.body.completed) {
        req.body.task = DOMpurify.sanitize(req.body.task);
    }
    
    next();
}

module.exports = { sanitizeXSS }
