import React from 'react';

import './close-button.scss';

interface OnClose {
  onClose: () => {}
}

const CloseButton: React.FC<OnClose> = ({onClose}) => {
  return (
    <div className="close-button" onClick={() => onClose()}>
        <div className="close-button__circle">
          <span className="close-button__circle close-button__circle--line-1"></span>
          <span className="close-button__circle close-button__circle--line-2"></span>
        </div>
    </div>
  )
}

export default CloseButton;