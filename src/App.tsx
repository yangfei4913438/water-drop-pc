import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routesList } from '@/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routesList.map((route) => {
          return <Route path={route.path} element={route.element} key={route.title} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
