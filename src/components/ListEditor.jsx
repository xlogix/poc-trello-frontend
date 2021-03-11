import '../styles/ListEditor.css';

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const ListEditor = (props) => {
  const ref = React.createRef();

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.saveList();
    }
  };

  const handleClick = (e) => {
    const node = ref.current;

    if (node.contains(e.target)) {
      return;
    }

    props.onClickOutside();
  };

  const { title, handleChangeTitle, deleteList } = props;

  return (
    <div className="List-Title-Edit" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <ion-icon name="trash-outline" onClick={deleteList} />}
    </div>
  );
}

export default ListEditor;
