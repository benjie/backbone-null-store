###
backbone-null-store - saves to /dev/null
###
do ->
  infect = (Backbone) ->
    _oldBackboneSync = Backbone.sync
    Backbone.sync = (method, model, options) ->
      unless model.nullStore or model.collection?.nullStore or model.model?.prototype.nullStore
        return _oldBackboneSync.call @, method, model, options
      else
        switch method
          when "read"
            if model.id
              options.error "Not found"
            else
              options.success []
          when "create"
            options.success model
          when "update"
            options.success model
          when "delete"
            options.success model
        return
    return
  if exports?
    exports.infect = infect
  else
    infect(Backbone)
  return
