const { readBody } = require('./utils')

function PluginServeHtml({ app, root }) {
  app.use(async (ctx, next) => {
    await next()

    if (ctx.response.is('html')) {
      const devInjection = `
      <script>
          window.process = {env:{NODE_ENV:'development'}}
      </script>
      `
      const html = await readBody(ctx.body)
      ctx.body = html.replace(/<head>/, `$&${devInjection}`)
    }
  })
}

module.exports = PluginServeHtml