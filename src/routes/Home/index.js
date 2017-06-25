import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HomeView = require('./containers/HomeViewContainer').default
      const reducer = require('./modules/homeview').default

      /*  Add the reducer to the store on key 'homeview'  */
      injectReducer(store, { key: 'homeview', reducer })

      /*  Return getComponent   */
      cb(null, HomeView)

    /* Webpack named bundle   */
    }, 'homeview')
  }
})
