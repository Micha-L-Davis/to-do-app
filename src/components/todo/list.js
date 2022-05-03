import { useContext, useState } from 'react';
import { SettingsContext } from '../../context/settings';


const List = (props) => {
  const settings = useContext(SettingsContext);
  return (
    props.list.map((item, index) => {
      if (index < settings.numToDisplay)
        return (
          <div key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
            <hr />
          </div>
        )
    })
  );
}

export default List;
