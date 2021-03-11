import '../styles/EditButtons.css';

import React from 'react';

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (
  <div className="Edit-Buttons">
    <div
      tabIndex="0"
      className="Edit-Button"
      style={{ backgroundColor: '#007A50' }}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
    {handleDelete && (
      <div
        tabIndex="0"
        className="Edit-Button"
        style={{ backgroundColor: '#294866', marginLeft: 0 }}
        onClick={handleDelete}
      >
        Delete
      </div>
    )}
    <div tabIndex="0" className="Edit-Button-Cancel" onClick={handleCancel}>
      <ion-icon name="close" />
    </div>
  </div>
);

export default EditButtons;
