import { ConfigProvider } from 'antd';
import './App.css';
import Routers from './router/Routers';
import ColorConstants from './constants/ColorConstants';


// Theme configuration
const theme = {
  token: {
    colorPrimary: ColorConstants.secondaryColor,
  },
};


function App() {
  return (
    
    <ConfigProvider theme={theme}>
      <div className="App">
        <Routers />
      </div>
    </ConfigProvider>
  );
}

export default App;
