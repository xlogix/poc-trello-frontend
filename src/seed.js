import shortid from 'shortid';

export default (store) => {
  console.log('Insert first list');
  const firstListId = shortid.generate();

  store.dispatch({
    type: 'ADD_LIST',
    payload: { listId: firstListId, listTitle: 'First list' },
  });

  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'This is the first card',
    },
  });

  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'This is the second card',
    },
  });

  console.log('Insert second list');
  const secondListId = shortid.generate();

  store.dispatch({
    type: 'ADD_LIST',
    payload: { listId: secondListId, listTitle: 'Second list' },
  });

  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: 'Card 1',
    },
  });

  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: 'Card 2',
    },
  });
};
