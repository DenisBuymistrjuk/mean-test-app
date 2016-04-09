'use strict';

module.exports = function(router, app){

  router.
      get('/testing', function (req, res) {
        res.json({
          message: 'success'
        });
      });

  // assign routers to application
  app.use(router);
};
