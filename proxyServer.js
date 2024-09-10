const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = function(app){
    console.log(app)
    app.use(createProxyMiddleware([
        '/auth/google/callback',
        '/auth/google',
        '/auth/me',
        '/auth/logout'
    ], {target:'https://localhost:4500/api/v1', changeOrigin:true}));
};