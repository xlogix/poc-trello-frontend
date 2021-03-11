import '../styles/Card.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import CardEditor from './CardEditor';

const Card = (props) => {

  const [state, setState] = useState({
    hover: false,
    editing: false,
  });

  const startHover = () => setState({ ...state, hover: true });
  const endHover = () => setState({ ...state, hover: false });

  const startEditing = () =>
    setState({
      hover: false,
      editing: true,
      text: props.card.text,
    });

  const endEditing = () => setState({ hover: false, editing: false });

  const editCard = async (text) => {
    const { card, dispatch } = props;

    endEditing();

    dispatch({
      type: 'CHANGE_CARD_TEXT',
      payload: { cardId: card._id, cardText: text },
    });
  };

  const deleteCard = async () => {
    const { listId, card, dispatch } = props;

    dispatch({
      type: 'DELETE_CARD',
      payload: { cardId: card._id, listId },
    });
  };

  const { card, index } = props;
  const { hover, editing } = state;

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <ion-icon name="create" />
                </div>
              </div>
            )}

            {card.text}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <CardEditor
        text={card.text}
        onSave={editCard}
        onDelete={deleteCard}
        onCancel={endEditing}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Card);
