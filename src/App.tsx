import React from 'react';
import logo from './logo.svg';
import './App.css';
import TabTable from './Components/TabComponents/TabTableContainer/TabTable/TabTable';
import TabTableContainer from './Components/TabComponents/TabTableContainer/TabTableContainer';
import AppContextProvider from './Data/AppContent';
import * as Tone from 'tone'
import './GlobalStyles.css';
import Sidepanel from './Components/Sidepanel/Sidepanel';
import PromptController from './Components/Prompts/PromptController';


function App() {
  return (
    <div className="App bgCol1">
      <AppContextProvider>
        <PromptController/>
        <Sidepanel/>
        <TabTableContainer/>
      </AppContextProvider>
    </div>
  );
}

export default App;
