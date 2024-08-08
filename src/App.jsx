import './App.css'
import Layout1 from "./components/layout/Layout1";
import Layout2 from "./components/layout/Layout2"
import {Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Selectcolor from './pages/SelectColor';
import Page1 from "./pages/Page1"
import Page2 from "./pages/Page2"
import Page3 from "./pages/Page3"
import Description from './pages/Description';
import { AppProvider } from './context';
import Layout3 from './components/layout/Layout3';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout1/>}>
            <Route index element={<Home/>}/>
        </Route>
        <Route element={<Layout2 />}>
            <Route path="selectcolor" element={<PrivateRoute element={Selectcolor} />}/>
            <Route path="page1" element={<PrivateRoute element={Page1} />}/>
            <Route path="page2" element={<PrivateRoute element={Page2} />}/>
            <Route path="page3" element={<PrivateRoute element={Page3} />}/>
        </Route>
        <Route element={<Layout3 />}>
            <Route path="description" element={<PrivateRoute element={Description} />}/>
            <Route path="preview" element={<PrivateRoute element={Preview} />}/>
        </Route>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </AppProvider>
  )
}

export default App
