import React from 'react';
import logo from './logo.svg';
import './App.css';
import TabTable from './Components/TabComponents/TabTableContainer/TabTable/TabTable';
import TabTableContainer from './Components/TabComponents/TabTableContainer/TabTableContainer';
import AppContextProvider from './Data/AppContent';
import * as Tone from 'tone'


function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <TabTableContainer/>
      </AppContextProvider>
    </div>
  );
}

export default App;
