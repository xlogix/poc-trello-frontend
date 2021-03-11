import shortid from 'shortid';

export const fetchCards = (dispatch) => {
  fetch("http://localhost:3001/cards")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: 'ADD_LIST',
        payload: { listId: shortid.generate(), listTitle: data.title },
      });
      console.log(data);
      return data;
    });
}

export const fetchTasks = () => {
  fetch("http://localhost:3001/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export const addCard = () => {
  let nextCard = {
    title: `New Card`,
    id: shortid.generate(),
  };

  fetch(`http://localhost:3001/cards`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      id: nextCard.id,
      title: nextCard.title
    }),
  });
};

export const deleteCard = (cardId) => {
  fetch(`http://localhost:3001/cards/${cardId}`, {
    method: "DELETE",
  });
};

// Add Task to Card
export const addTask = (parentCardId, addedTitle) => {
  const newTask = {
    id: shortid.generate(),
    title: addedTitle,
    completed: false,
    parentId: parentCardId,
  };

  fetch(`http://localhost:3001/tasks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(newTask),
  });
};

export const deleteTask = (taskId) => {
  fetch(
    `http://localhost:3001/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
};

export default { fetchCards, fetchTasks }