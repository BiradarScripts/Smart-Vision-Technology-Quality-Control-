// var createError = require('http-errors');
var express = require('express');
var path = require('path');
const entryRoutes = require("./routes/data");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const uploadRouter = require('./routes/upload_product');
const brandItemsRoute = require('./routes/brand');
const uploadItemsRoutes = require('./routes/upload');
const cors = require('cors');
const prismaMiddleware = require('./routes/middleware/middleware');

var app = express();
app.use(cors());

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(prismaMiddleware);
// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api", entryRoutes);
// app.use("/api2", uploadRouter);
app.use('/api', brandItemsRoute);
app.use('/api', uploadItemsRoutes);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


const PORT = 3000;

// Only start listening when NOT in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// const express = require("express");
// const app = express();



// app.listen(3000, () => console.log("Server ready on port 3000."));


module.exports = app;
