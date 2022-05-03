import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  const [hideCompleted, setHideCompleted] = useState(true);
  const [numToDisplay, setNumToDisplay] = useState(3);
  const [defaultSortField, setSortField] = useState('NAME')

  return (
    <SettingsContext.Provider value={{ hideCompleted, numToDisplay, defaultSortField }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
