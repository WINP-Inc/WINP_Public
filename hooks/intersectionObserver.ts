import React, { useEffect } from 'react';

/**
 * Sets up an IntersectionObserver to track changes in the intersection of a given element with its parent.
 * @example
 * observeIntersection(ref, {threshold: 0.5}, (entry) => console.log(entry.intersectionRatio))
 * @param {React.RefObject<HTMLDivElement>} ref - The element to be observed.
 * @param {IntersectionObserverInit} options - Options for the IntersectionObserver.
 * @param {(entry: IntersectionObserverEntry) => void} callback - A function to be called when the intersection changes.
 * @returns {void} Returns nothing.
 * @description
 *   - Uses the provided ref to create a new IntersectionObserver.
 *   - The options parameter can include a threshold value to specify the percentage of intersection needed to trigger the callback.
 *   - The callback function will be passed an IntersectionObserverEntry object with information about the intersection.
 *   - The observer will be disconnected when the component unmounts.
 */
export const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>, options: IntersectionObserverInit, callback: (entry: IntersectionObserverEntry) => void) => {
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            callback(entry);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, options, callback]);
};