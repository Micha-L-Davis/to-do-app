import React, { useEffect, useState, useContext } from 'react';
import useForm from './hooks/form.js';
import Header from './components/header/header';
import Form from './components/todo/form';
import List from './components/todo/list';

import { SettingsContext } from './context/settings';

import { v4 as uuid } from 'uuid'
import { Button } from '@blueprintjs/core';

function App() {

  const settings = useContext(SettingsContext);

  const defaultValues = {
    difficulty: 4,
  }

  const [page, setPage] = useState(0);
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

  function paginateList(list) {
    if (list.length <= settings.numToDisplay) return list;

    let entries = []
    let initialIndex = page * settings.numToDisplay
    let finalIndex = ((page + 1) * settings.numToDisplay) - 1;

    for (let i = initialIndex; i <= finalIndex && i < list.length; i++) {
      entries.push(list[i])
    }

    return entries;
  }

  function advancePage(event) {
    event.preventDefault();

    setPage(page + 1);
  }

  function previousPage(event) {
    event.preventDefault();

    setPage(page - 1);
  }

  return (
    <>
      <Header incomplete={incomplete} />

      <Form handleChange={handleChange} handleSubmit={handleSubmit} defaultValues={defaultValues} />
      {
        page > 0 &&
        <Button icon='arrow-left' onClick={previousPage} data-testId='prev-button'> Prev</Button>
      }
      {
        list.length > settings.numToDisplay &&
        page < (list.length / settings.numToDisplay) - 1 &&
        <Button rightIcon='arrow-right' onClick={advancePage} data-testId='next-button'>Next </Button>
      }
      <List list={paginateList(list)} />
    </>
  );
}

export default App;
