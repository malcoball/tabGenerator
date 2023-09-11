import './App.css';
import TabTableContainer from './Components/TabComponents/TabTableContainer/TabTableContainer';
import AppContextProvider from './Data/AppContent';
import './GlobalStyles.css';
import Sidepanel from './Components/Sidepanel/Sidepanel';
import PromptController from './Components/Prompts/PromptController';


function App() {
  return (
    <div className="App bgCol1">
      <AppContextProvider>
        <PromptController/>
        <Sidepanel/>
        <h1 className='font1'>Tab Generator</h1>
        <TabTableContainer/>
      </AppContextProvider>
    </div>
  );
}

export default App;
