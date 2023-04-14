import React from "react";

function ClosePopupOnKeydown(props) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && props.action();
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  });
}

export default ClosePopupOnKeydown;
