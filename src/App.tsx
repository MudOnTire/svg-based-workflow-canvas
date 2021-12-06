import Editor from 'src/components/Editor';
import { StoreProvider } from 'src/store';
import './app.scss';

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Editor />
      </div>
    </StoreProvider>
  );
}

export default App;
