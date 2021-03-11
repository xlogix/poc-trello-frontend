import '../styles/Board.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import List from './List';
import AddList from './AddList';

const Board = (props) => {
  const [state, setState] = useState({
    addingList: false,
  });

  const toggleAddingList = () =>
    setState({ addingList: !state.addingList });

  const handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = props;

    // Move list
    if (type === 'COLUMN') {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: 'MOVE_LIST',
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: 'MOVE_CARD',
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  const { board } = props;
  const { addingList } = state;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className="Board" ref={provided.innerRef}>
            {board.lists.map((listId, index) => {
              return <List listId={listId} key={listId} index={index} />;
            })}

            {provided.placeholder}

            <div className="Add-List">
              {addingList ? (
                <AddList toggleAddingList={toggleAddingList} />
              ) : (
                <div
                  onClick={toggleAddingList}
                  className="Add-List-Button"
                >
                  <ion-icon name="add" /> Add a list
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => ({ board: state.board });

export default connect(mapStateToProps)(Board);
