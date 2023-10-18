import React, {useState} from 'react';


function Info() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className='button info' onClick={() => { setClicked(!clicked); }}>
        <svg className="icon" width="50px" height="50px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.5C21 17.1944 17.1944 21 12.5 21C7.80558 21 4 17.1944 4 12.5C4 7.80558 7.80558 4 12.5 4C17.1944 4 21 7.80558 21 12.5ZM12 10.5V9H13V10.5H12ZM13 16V12H12V16H13Z"/>
        </svg>
      </div>
      {clicked && (
        <>
        <div className="tooltip infoButt">
         <h3>Info</h3>
          <p>This website was done as part of a Project at the University of Dundee.
            <br/><br/>
            Please fill out the <a href='https://forms.office.com/e/0pbvx5G9wA'>Feedback Form</a>, it would greatly further help this project grow.
            <br/>
            <b>Anatomists</b> - Madison Gordon-Mara, Sadie Tremblay, Sean Johnson
            <br/>
            <b>3D Artists</b> - Philip Cooper, Meghana Mokhasi
            <br/>
            <b>Developer</b> - Marlon D'Ambrosio

          </p>
        </div>
        </>
      )}
  </>
  );
};

export default Info;
