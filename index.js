import express from 'express';
//import path from 'path';
import { route } from './router';
import mongoose from 'mongoose';
import { environment } from './environments';
import { json } from 'body-parser';
import morgan from 'morgan';

const app = express();

//app.use(express.static(path.join(__dirname, '/statics'), {
  //  setHeaders: (res, loc, stat) => {
    //    res.set('Service-Worker-Allowed', '/');
    //}
//}));

app.use(json());
app.use(morgan('dev'));

route(app);

mongoose.connect(environment.MONGO, {
    keepAlive: true
}, (err) => {
    if (err) console.error(err);
    app.listen(3000, () => console.log('Express server fired'));
});