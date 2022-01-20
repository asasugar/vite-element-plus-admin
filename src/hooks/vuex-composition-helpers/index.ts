/*
 * @Description: vuex-compotision-helpers【修改至vuex helpers】https://github.com/vuejs/vuex/blob/main/src/helpers.js
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 17:01:13
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-20 21:11:43
 */
import { Store, useStore } from 'vuex';
import { isObject } from '@/utils';

const __DEV__ = import.meta.env.NODE_ENV === 'development';

type Actions = Array<string> | { [x: string]: any };

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
export const useState = normalizeNamespace(
  (namespace: string | undefined, states: Actions): object => {
    const res: any = {};
    const store: Store<any> = useStore();

    console.log(5, namespace, states);
    if (__DEV__ && !isValidMap(states)) {
      console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(states).forEach(({ key, val }) => {
      res[key] = function mappedState() {
        let state = store.state;
        let getters = store.getters;
        if (namespace) {
          const module = getModuleByNamespace(store, 'mapState', namespace);
          if (!module) {
            return;
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === 'function' ? val.call(this, state, getters) : state[val];
      };
      // res[key].vuex = true;

      // mark vuex getter for devtools
    });
    return res;
  }
);

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const useActions = normalizeNamespace(
  (namespace: string | undefined, actions: Actions): object => {
    const res: any = {};
    if (__DEV__ && !isValidMap(actions)) {
      console.error('[vuex] useActions: mapper parameter must be an Array');
    }
    const store: Store<any> = useStore();

    normalizeMap(actions).forEach(({ key, val }) => {
      res[key] = function mappedAction(...args: Array<string>) {
        // get dispatch function from store
        let dispatch: any = store.dispatch;
        if (namespace) {
          const module = getModuleByNamespace(store, 'mapActions', namespace);

          if (!module) {
            return;
          }
          dispatch = module.context.dispatch;
        }

        return typeof val === 'function'
          ? val.apply(this, [dispatch].concat(args))
          : dispatch.apply(store, [val].concat(args));
      };
    });
    return res;
  }
);

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap(map: Actions) {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map.key }));
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap(map: Actions) {
  return Array.isArray(map) || isObject(map);
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace(fn: {
  (namespace: string | undefined, actions: Actions): object;
  (arg0: any, arg1: any): any;
}) {
  return (namespace: string, map: any) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store: any, helper: string, namespace: string) {
  const module = store._modulesNamespaceMap[namespace];
  if (__DEV__ && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`);
  }
  return module;
}
