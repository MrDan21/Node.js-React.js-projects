import React, {Fragment} from 'react';

/** Routing */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Layout */
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

/** Components */
import clientIndex from './pages/clients/Index';
import clientCreate from './pages/clients/Create';
import clientEdit from './pages/clients/Edit';

import productIndex from './pages/products/Index';
import productCreate from './pages/products/Create';
import productEdit from './pages/products/Edit';

import invoiceCreate from './pages/invoices/Create';
import invoiceIndex from './pages/invoices/Index';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navigation />
          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={clientIndex} />

              <Route exact path="/products" component={productIndex} />
              <Route exact path="/products/create" component={productCreate} />
              <Route exact path="/products/edit/:id" component={productEdit} />

              <Route exact path="/clients/create" component={clientCreate} />
              <Route exact path="/clients/edit/:id" component={clientEdit} />

              <Route exact path="/invoices/create/:id" component={invoiceCreate} />
              <Route exact path="/invoices" component={invoiceIndex} />
            </Switch>
          </main>
        </div>  
      </Fragment>
    </Router>  
  )
}

export default App;
