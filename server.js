import express from 'express';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import postcssMiddleware from 'postcss-middleware';

import router from './routes/index';
import apiRouter from './routes/api';

const app = express();

app.use('/bin', express.static('./bin'));
app.use('/stylesheets', postcssMiddleware({
  plugins: [precss, autoprefixer]
}));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/js', express.static('./public/js'));
app.use('/images', express.static('./public/images'));


app.use('/', router);
app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
