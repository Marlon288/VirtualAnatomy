import React from 'react';

function Play() {
  const styles = {
    marginLeft: "2px"
  }; 

  return (
    <div className='button play'>
      <svg style={styles} className="icon" width="50px" height="50px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 18.5V6.5L17.5 12.5L7.5 18.5Z"/>
      </svg>
    </div>
  );
};

export default Play;
