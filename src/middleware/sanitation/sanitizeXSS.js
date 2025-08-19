import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMpurify = createDOMPurify(window);

export const sanitizeXSS = (req, res, next) => {
    if(req.body.task) {
        req.body.task = DOMpurify.sanitize(req.body.task);
    }

    if(req.body.completed) {
        req.body.task = DOMpurify.sanitize(req.body.task);
    }
    
    next();
}

