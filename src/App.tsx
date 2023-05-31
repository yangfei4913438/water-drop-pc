import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import { homePath, loginPath } from '@/consts/routes';
import Login from '@/pages/login';
import { routesList } from '@/routes';

dayjs.extend(utc);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginPath} element={<Login />} />
        <Route path={homePath} element={<Layout />}>
          {routesList.map((route) => {
            return <Route path={route.path} element={route.element} key={route.name} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
