import React, { useState, useImperativeHandle, useEffect } from "react";

const Togglable = React.forwardRef(
  ({ children, buttonText, visibility }, ref) => {
    const _buttonText = buttonText ? buttonText : "Show";
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(visibility);
    }, [visibility]);

    const toggleVisiblity = () => {
      setIsVisible(!isVisible);
    };

    useImperativeHandle(ref, () => {
      return { toggleVisiblity };
    });

    return (
      <>
        {isVisible && children}
        <button style={{ display: "block" }} onClick={toggleVisiblity}>
          {isVisible ? "Hide" : _buttonText}
        </button>
      </>
    );
  }
);

export default Togglable;
