import '../styles/List.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';
import CardEditor from './CardEditor';
import ListEditor from './ListEditor';

import shortid from 'shortid';

const List = (props) => {

  const [state, setState] = useState({
    editingTitle: false,
    title: props.list.title,
    addingCard: false,
  });

  const toggleAddingCard = () =>
    setState({ addingCard: !state.addingCard });

  const addCard = async (cardText) => {
    const { listId, dispatch } = props;

    toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: 'ADD_CARD',
      payload: { cardText, cardId, listId },
    });
  };

  const toggleEditingTitle = () =>
    setState({ editingTitle: !state.editingTitle });

  const handleChangeTitle = (e) => setState({ title: e.target.value });

  const editListTitle = async () => {
    const { listId, dispatch } = props;
    const { title } = state;

    toggleEditingTitle();

    dispatch({
      type: 'CHANGE_LIST_TITLE',
      payload: { listId, listTitle: title },
    });
  };

  const deleteList = async () => {
    const { listId, list, dispatch } = props;

    dispatch({
      type: 'DELETE_LIST',
      payload: { listId, cards: list.cards },
    });
  };
  // const dispatch = useDispatch();
  const { list, index } = props;
  const { editingTitle, addingCard, title } = state;

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="List-Title" onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {addingCard ? (
            <CardEditor
              onSave={addCard}
              onCancel={toggleAddingCard}
              adding
            />
          ) : (
            <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
              <ion-icon name="add" /> Add a card
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);
