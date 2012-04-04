/*
backbone-null-store - saves to /dev/null
*/
(function() {
  var infect;
  infect = function(Backbone) {
    var _oldBackboneSync;
    _oldBackboneSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
      var _ref, _ref2;
      if (!(model.nullStore || ((_ref = model.collection) != null ? _ref.nullStore : void 0) || ((_ref2 = model.model) != null ? _ref2.prototype.nullStore : void 0))) {
        return _oldBackboneSync.call(this, method, model, options);
      } else {
        switch (method) {
          case "read":
            if (model.id) {
              options.error("Not found");
            } else {
              options.success([]);
            }
            break;
          case "create":
            options.success(model);
            break;
          case "update":
            options.success(model);
            break;
          case "delete":
            options.success(model);
        }
      }
    };
  };
  if (typeof exports !== "undefined" && exports !== null) {
    exports.infect = infect;
  } else {
    infect(Backbone);
  }
})();
