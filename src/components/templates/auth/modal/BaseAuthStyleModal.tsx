import React from "react";

export const AuthModalStyle = (width?: string, height?: string): React.CSSProperties => {
  return {
    width: width ? width : 'auto',
    height: height ? height : 'auto',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: '#261F32',
    border: 'none',
    padding: '0',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    overflow: 'inherit'
  }
}