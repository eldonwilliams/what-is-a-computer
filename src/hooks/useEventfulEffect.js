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
        const disconnections = callback();
        return () => disconnections.forEach((value) => {
            if (typeof value === "object") {
                // Is array with [Object, Function]
            } else if (typeof value === "function") {
                // Is a function (defaultConnector)
                defaultConnector.removeEventHandler();
            }
        });
    }, [...deps]);
};

export default useEventfulEffect;