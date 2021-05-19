import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { MainPage } from './mainpage.js'
import { PostCodePage } from './postcode.js'

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch> 
          <Route path='/' exact component={MainPage}></Route>
          <Route path='/postcode/:id' exact component={PostCodePage}></Route>
          <Route path='/' render={() => <div>404</div>}></Route>
      </Switch>
    </BrowserRouter>
  )
}