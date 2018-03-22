import chai from 'chai'
import sinon from 'sinon'
import { MyLib } from '../../lib/mylibrary.js'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('MyLib class', () => {
  describe('constructor', () => {
    let myLib

    beforeEach(() => {
      myLib = new MyLib()
    })

    it('should have foo name', () => {
      assert.property(myLib, 'name')
      assert.propertyVal(myLib, 'name', 'foo')
    })
  })
})
