// server/server.js
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import App from '../src/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('build'));

app.get('*', (req, res) => {
  const appHtml = renderToString(<App />);
  const helmet = Helmet.renderStatic();

  const html = `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});