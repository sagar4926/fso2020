import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef(({ children, buttonText }, ref) => {
  const _buttonText = buttonText ? buttonText : "Show";
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisiblity = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisiblity };
  });

  return (
    <>
      {isVisible && children}
      <button id="btn-toggle" onClick={toggleVisiblity} style={{ margin: 5 }}>
        {isVisible ? "Hide" : _buttonText}
      </button>
    </>
  );
});

Togglable.displayName = "Toggleable";

export default Togglable;
