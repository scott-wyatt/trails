'use strict'

/**
 * Trails Service Class.
 */
module.exports = class TrailsService {

  constructor (app) {
    Object.defineProperty(this, 'app', {
      enumerable: false,
      writable: false,
      value: app
    })
  }

  /**
   * Return the id of this controller
   */
  get id () {
    return this.constructor.name.replace(/(\w+)Service/, '$1').toLowerCase()
  }

  /**
   * Return a reference to the Trails logger
   */
  get log () {
    return this.app.log
  }

  /**
   * Return a reference to the i18n translate function
   */
  get __ () {
    return this.app.__
  }

  get services () {
    return this.app.services
  }

  get models () {
    return this.app.models
  }
}