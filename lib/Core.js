/*eslint no-console: 0 */

//const fs = require('fs')
const mkdirp = require('mkdirp')
const mapValues = require('lodash.mapvalues')
const lib = require('./')

const Core = module.exports = {

  reservedMethods: [
    'app',
    'api',
    'log',
    '__',
    'constructor',
    'undefined',
    'methods',
    'config',
    'schema',
    'services',
    'models'
  ],

  globals: Object.freeze(Object.assign({
    Service: require('./Service'),
    Controller: require('./Controller'),
    Policy: require('./Policy'),
    Model: require('./Model'),
    Resolver: require('./Resolver')
  }, lib.Errors)),

  globalPropertyOptions: Object.freeze({
    writable: false,
    enumerable: false,
    configurable: false
  }),

  /**
   * Prepare the global namespace with required Trails types. Ignore identical
   * values already present; fail on non-matching values.
   *
   * @throw NamespaceConflictError
   */
  assignGlobals () {
    Object.entries(lib.Core.globals).forEach(([name, type]) => {
      if (global[name] === type) return
      if (global[name] && global[name] !== type) {
        throw new lib.Errors.NamespaceConflictError(name, Object.keys(lib.Core.globals))
      }
      const descriptor = Object.assign({ value: type }, lib.Core.globalPropertyOptions)
      Object.defineProperty(global, name, descriptor)
    })
  },

  /**
   * Bind the context of API resource methods.
   */
  bindMethods (app, resource) {
    return mapValues(app.api[resource], (Resource, resourceName) => {
      const obj = new Resource(app)

      obj.methods = Core.getClassMethods(obj)
      Object.entries(obj.methods).forEach(([ _, method ])  => {
        obj[method] = obj[method].bind(obj)
      })
      return obj
    })
  },

  /**
   * Traverse protoype chain and aggregate all class method names
   */
  getClassMethods (obj) {
    const props = [ ]
    const objectRoot = new Object()

    while (!obj.isPrototypeOf(objectRoot)) {
      Object.getOwnPropertyNames(obj).forEach(prop => {
        if (props.indexOf(prop) === -1 &&
            !Core.reservedMethods.includes(prop) &&
            typeof obj[prop] === 'function') {

          props.push(prop)
        }
      })
      obj = Object.getPrototypeOf(obj)
    }

    return props
  },

  mergeApi (app, pack) {
    pack.api || (pack.api = { })

    Object.assign(app.api.controllers, pack.api.controllers)
    Object.assign(app.api.services, pack.api.services)
    Object.assign(app.api.policies, pack.api.policies)
    Object.assign(app.api.resolvers, pack.api.resolvers)
    Object.assign(app.api.models, pack.api.models)
  },

  /**
   * Create configured paths if they don't exist
   */
  async createDefaultPaths (app) {
    const paths = app.config.get('main.paths') || { }

    for (const [ , dir ] of Object.entries(paths)) {
      await mkdirp(dir)
    }
  },

  /**
   * Bind listeners to trails application events
   */
  bindApplicationListeners (app) {
    app.once('trailpack:all:configured', () => {
      if (app.config.get('main.freezeConfig') === false) {
        app.log.warn('freezeConfig is disabled. Configuration will not be frozen.')
        app.log.warn('Please only use this flag for testing/debugging purposes.')
      }

      app.config.freeze()
    })
    app.once('trailpack:all:initialized', () => {
      app.log.silly(lib.Templates.silly.initialized)
      app.log.info(lib.Templates.info.initialized)
    })
    app.once('trails:ready', () => {
      app.log.info(lib.Templates.info.ready(app))
      app.log.debug(lib.Templates.debug.ready(app))
      app.log.silly(lib.Templates.silly.ready(app))

      app.log.info(lib.Templates.hr)
      app.log.info(lib.Templates.docs)
    })
    app.once('trails:stop', () => {
      app.log.info(lib.Templates.info.stop)
      app.config.unfreeze()
    })
  },

  /**
   * Bind lifecycle boundary event listeners. That is, when all trailpacks have
   * completed a particular phase, e.g. "configure" or "initialize", emit an
   * :all:<phase> event.
   */
  bindTrailpackPhaseListeners (app, packs) {
    const validatedEvents = packs.map(pack => `trailpack:${pack.name}:validated`)
    const configuredEvents = packs.map(pack => `trailpack:${pack.name}:configured`)
    const initializedEvents = packs.map(pack => `trailpack:${pack.name}:initialized`)

    app.after(configuredEvents).then(async () => {
      await this.createDefaultPaths(app)
      app.emit('trailpack:all:configured')
    })

    app.after(validatedEvents).then(() => app.emit('trailpack:all:validated'))

    app.after(initializedEvents)
      .then(() => {
        app.emit('trailpack:all:initialized')
        app.emit('trails:ready')
      })
  },

  /**
   * Bind individual lifecycle method listeners. That is, when each trailpack
   * completes each lifecycle, fire individual events for those trailpacks.
   */
  bindTrailpackMethodListeners (app, pack) {
    const lifecycle = pack.lifecycle || { }

    app.after(((lifecycle.initialize || { }).listen || [ ]).concat('trailpack:all:configured'))
      .then(() => app.log.debug('trailpack: initializing', pack.name))
      .then(() => pack.initialize())
      .then(() => app.emit(`trailpack:${pack.name}:initialized`))
      .catch(this.handlePromiseRejection)

    app.after(((lifecycle.configure || { }).listen || [ ]).concat('trailpack:all:validated'))
      .then(() => app.log.debug('trailpack: configuring', pack.name))
      .then(() => pack.configure())
      .then(() => app.emit(`trailpack:${pack.name}:configured`))
      .catch(this.handlePromiseRejection)

    app.after('trails:start')
      .then(() => app.log.debug('trailpack: validating', pack.name))
      .then(() => pack.validate())
      .then(() => app.emit(`trailpack:${pack.name}:validated`))
      .catch(this.handlePromiseRejection)
  },

  handlePromiseRejection (err) {
    console.error(err)
    throw err
  }

}
