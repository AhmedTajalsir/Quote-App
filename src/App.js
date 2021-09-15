import React,{ Suspense} from 'react';
import {Route, Switch , Redirect} from 'react-router-dom'
import Layout from './components/layout/Layout';

import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuota = React.lazy(()=> import('./pages/NewQuota'))
const QuotaDetail = React.lazy(()=> import('./pages/QuotaDetail'))
const NotFound = React.lazy(()=>import('./pages/NotFound'))
const AllQuotes = React.lazy(()=>import('./pages/AllQuotes'))
function App() {
  return (
  <Layout>
   <Suspense fallback={ <div className='centered'> <LoadingSpinner /> </div>}>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes'/>
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes />
      </Route>
      <Route path='/quotes/:quotedId'>
        <QuotaDetail />
      </Route>
      <Route path='/new-quote'>
        <NewQuota />
      </Route>
      <Route path='*'>
        <NotFound />
      </Route>
     </Switch> 
    </Suspense>
  </Layout>
  );
}

export default App;
