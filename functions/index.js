import { renderFile } from 'ejs'

// Cloudflare Workers don't have a Node.js `fs` module,
// so you need to inline your EJS template or fetch it from KV/Assets

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head><title><%= title %></title></head>
<body>
  <h1>Hello <%= name %>!</h1>
</body>
</html>
`

export const onRequestGet = async ({ request }) => {
  const html = await renderFile(
    { filename: 'index.ejs' },
    { title: 'EJS on Workers', name: 'Cloudflare' },
    { async: true, views: [] },
  )

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
