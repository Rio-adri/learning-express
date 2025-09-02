const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMpurify = createDOMPurify(window);


function deepSanitize(value) {
    if (typeof value === 'string') {
      return DOMpurify.sanitize(value);
    } else if (Array.isArray(value)) {
      return value.map(item => deepSanitize(item));
    } else if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        value[key] = deepSanitize(value[key]);
      }
      return value;
    }
    return value;
}

const sanitizeXSS = (req, res, next) => {
    if (req.body) {
        req.body = deepSanitize(req.body);
    }
    next();
}

module.exports = { sanitizeXSS };
