'use strict'
const wrappy = require('wrappy')
module.exports = wrappy(strictOnce)

function strictOnce (fn) {
  function f () {
    // jshint validthis:true
    if (f.called) {
      const errmsg = f.onceError || createErrorMsg(fn)
      throw Error(errmsg)
    }
    f.called = true
    f.value = fn.apply(this, arguments)
    return f.value
  }
  f.called = false
  return f
}

function createErrorMsg (fn) {
  return fn.name && (fn.name + " shouln't be called more than once") ||
    "Function wrapped with `once` shouln't be called more than once"
}
