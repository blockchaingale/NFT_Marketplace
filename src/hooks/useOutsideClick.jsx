import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

function useOutsideAlerter(ref, controllerRef, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = ({ target }) => {
      if (
        ref.current &&
        !ref.current?.contains(target) &&
        controllerRef &&
        !controllerRef.current?.contains(target)
      ) {
        callback();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, controllerRef]);
}

/**
 * Component that alerts if you click outside of it
 */
export default useOutsideAlerter;
