const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/graphql', {
            target: 'http://localhost:4800',
            changeOrigin: true,
        })
    )
    app.use(
        createProxyMiddleware('/assets', {
            target: 'http://localhost:4800',
            changeOrigin: true,
        })
    )
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:4800',
            changeOrigin: true,
        })
    )
}
