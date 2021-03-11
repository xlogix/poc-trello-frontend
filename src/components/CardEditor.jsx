import '../styles/CardEditor.css';

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditButtons from './EditButtons';

const CardEditor = (props) => {

  const [state, setState] = useState({
    text: props.text || '',
  });

  const handleChangeText = (event) => setState({ text: event.target.value });

  const onEnter = (e) => {
    const { text } = state;

    if (e.keyCode === 13) {
      e.preventDefault();
      props.onSave(text);
    }
  };

  const { text } = state;
  const { onSave, onCancel, onDelete, adding } = props;

  return (
    <div className="Edit-Card">
      <div className="Card">
        <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? 'Add card' : 'Save'}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
}

export default CardEditor;
