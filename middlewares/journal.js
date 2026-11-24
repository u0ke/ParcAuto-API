export default function journal(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}