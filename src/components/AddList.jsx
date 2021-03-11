import '../styles/AddList.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import ListEditor from './ListEditor';
import shortid from 'shortid';
import EditButtons from './EditButtons';

const AddList = (props) => {

  const [state, setState] = useState({
    title: '',
  });

  const handleChangeTitle = (e) => setState({ title: e.target.value });

  const createList = async () => {
    const { title } = state;
    const { dispatch } = props;

    props.toggleAddingList();

    dispatch({
      type: 'ADD_LIST',
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };

  const { toggleAddingList } = props;
  const { title } = state;

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={'Add list'}
        handleCancel={toggleAddingList}
      />
    </div>
  );
}

export default connect()(AddList);
