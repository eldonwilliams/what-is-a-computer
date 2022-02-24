import { useEffect } from "react";

/**
 * == Custom written for what-is-a-computer ==
 * This is a wrapper around the normal useEffect callback which allows you to return a list of event connections and eventful-effect will handle them automagically.
 * @param {() => Array<Array<Object | Function> | Function>} callback 
 * @param {import('react').DependencyList} deps
 * @param {Object} [defaultConnector]
 * @example
 *   // The following example shows a basic use-case of eventful-effect
 *   useEventfulEffect(() => {
 *      const keydownHandler = () => undefined;
 *      window.addEventHandler("keydown", keydownHandler);
 *      return [[window, keydownHandler]]; // The keydownHandler will automatically be disconnected from window (or default connector)
 *   }, []);
 */
const useEventfulEffect = (callback, deps, defaultConnector) => {
    useEffect(() => {
        const connections = [];
        // This function is passed to the callback so that we can track what object and events are connected
        /**
         * @param {Object} object 
         * @param {string} eventName 
         * @param {Function} listener 
         */
        const connectEvent = (object, eventName, listener) => {
            object.addEventListener(eventName, listener);
            connections.push([object, eventName, listener]);
        }

        callback(connectEvent);

        return () => connections.forEach((value) => value.object.removeEventListener(value.eventName, value.listener));
    });
};

export default useEventfulEffect;