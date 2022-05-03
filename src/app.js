import React, { useEffect, useState } from 'react';
import useForm from './hooks/form.js';
import Header from './components/header/header';
import Form from './components/todo/form';
import List from './components/todo/list';

import { v4 as uuid } from 'uuid'

function App() {

  const defaultValues = {
    difficulty: 4,
  }

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

    useEffect(() => {
      let incompleteCount = list.filter(item => !item.complete).length;
      setIncomplete(incompleteCount);
      document.title = `To Do List: ${incomplete}`;
    }, [list]);
  }

  return (
    <>
      <Header incomplete={incomplete} />

      <Form handleChange={handleChange} handleSubmit={handleSubmit} defaultValues={defaultValues} />

      <List list={list} />
    </>
  );
}

export default App;
