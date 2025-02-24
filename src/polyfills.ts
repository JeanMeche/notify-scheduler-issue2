/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/** *************************************************************************************************
 * BROWSER POLYFILLS
 */

// 20221212 LANDER: importing because .at(-1) is not found in safari 15
if (![].at) {
  Array.prototype.at = function (pos) {
    if (pos === -1) return this.slice(pos)[0];
    else return this.slice(pos, pos + 1)[0];
  };
}

// 20230413 RUBEN: added because of crash on old tablet
if (!String.prototype.at) {
  // define the at method if it doesn't exist
  String.prototype.at = function (index) {
    // convert the string to a string to handle null and undefined values
    const str = String(this);
    // get the size of the string
    const size = str.length;
    // initialize the index variable to the given index
    let i = index;
    // if the index is negative, calculate it relative to the end of the string
    if (i < 0) {
      i = size + i;
      // if the new index is still negative, set it to 0
      if (i < 0) {
        i = 0;
      }
    }
    // if the index is greater than or equal to the size of the string, return an empty string
    if (i >= size) {
      return '';
    }
    // use the substring method to get the character at the specified index
    return str.substring(i, i + 1);
  };
}

// 20240208 LANDER: added because of crash on samsung browser
if (!Array.prototype.findLast) {
  Array.prototype.findLast = function (callback) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = len - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return undefined;
  };
}

// 20240912 Tiago: added because of crash on safari browser
if (![].toReversed) {
  Array.prototype.toReversed = function () {
    const arr: any[] = [];
    for (let i = this.length - 1; i >= 0; --i) {
      arr.push(this[i]);
    }

    return arr;
  };
}

// 20241104 RUBEN: added because of crash on old Edge and Chrome versions
if (!Object.hasOwn) {
  Object.hasOwn = (object, property) => object.hasOwnProperty(property);
}

// Angular-Cli 9.1.0 bug-fix combined with an issue in TS 3.8 - remove when solved
// see here for why:
// https://github.com/angular/angular-cli/issues/17320
// https://github.com/angular/angular-cli/issues/17320
// window['_rollupMoment__default'] = null;

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** *************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js'; // Included with Angular CLI.

/** *************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.

// /**
//  * required by ng-dragula
//  * @type {Window}
//  */
(window as any).global = window;

/**
 * required to measure first input delay by AngularFirePerformance
 */
import 'first-input-delay';
