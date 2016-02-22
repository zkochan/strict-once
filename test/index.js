'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const once = require('..')

describe('strict-once', function () {
  it('throw error for named function', function () {
    function fn (a) {
      return a + this
    }
    fn.ownProperty = {}
    const foo = once(fn)
    expect(fn.ownProperty).to.eql(foo.ownProperty)
    expect(foo.called).to.be.false

    expect(foo.call(1, 2)).to.eq(3)
    expect(foo.value).to.eq(3)
    expect(foo.called).to.be.true

    expect(() => foo.call(2, 2))
      .to.throw(Error, "fn shouln't be called more than once")
  })

  it('throw error for anonymous function', function () {
    const foo = once((a, b) => a + b)
    expect(foo.called).to.be.false

    expect(foo(1, 2)).to.eq(3)
    expect(foo.value).to.eq(3)
    expect(foo.called).to.be.true

    expect(() => foo(2, 2))
      .to.throw(Error, "Function wrapped with `once` shouln't be called more than once")
  })

  it('throw custom error message', function () {
    function fn (a) {
      return a + this
    }
    fn.onceError = 'foo error'
    const foo = once(fn)
    expect(foo.called).to.be.false

    expect(foo.call(1, 2)).to.eq(3)
    expect(foo.value).to.eq(3)
    expect(foo.called).to.be.true

    expect(() => foo.call(2, 2))
      .to.throw(Error, 'foo error')
  })
})
