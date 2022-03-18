import { useEffect } from "react";

/**
 * Handles the connection of a listener to some object using "addEventListener"
 * Whatever argument is passed for object must have a addEventListener that is callable
 * @typedef {Function} ConnectListener
 * @function
 * @param {Object} object 
 * @param {string} eventName 
 * @param {Function} listener 
 */

/**
 * This is a wrapper around the normal useEffect callback which allows you to return a list of event connections and eventful-effect will handle them automagically.
 * @param {(connectListener: function(object: Object, eventName: string, listener: Function)) => any} callback 
 * @param {import('react').DependencyList} deps
 * @example
 *   // The following example shows a basic use-case of eventful-effect
 *   useEventfulEffect(() => {
 *      const keydownHandler = () => undefined;
 *      window.addEventHandler("keydown", keydownHandler);
 *      return [[window, keydownHandler]]; // The keydownHandler will automatically be disconnected from window (or default connector)
 *   }, []);
 */
const useEventfulEffect = (callback, deps) => {
    useEffect(() => {
        const connections = [];
        // This function is passed to the callback so that we can track what object and events are connected
        /**
         * @type {ConnectListener}
         */
        const connectListener = (object, eventName, listener) => {
            object.addEventListener(eventName, listener);
            connections.push([object, eventName, listener]);
        }

        callback(connectListener);

        return () => connections.forEach((value) => value[0].removeEventListener(value[1], value[2]));
    }, deps);
};

export default useEventfulEffect;