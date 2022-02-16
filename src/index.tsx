import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'
import { About } from './components/About';

import { App } from './components/App';
import { Skills } from './components/Skills';
import './style/index.less';

ReactDOM.render(
    <HashRouter>
        <Link id="back-home" to='/'><h2>{'< Back'}</h2></Link>
        <Route exact path='/' component={ App } />
        <Route exact path='/skills' component={ Skills } />
        <Route exact path='/about_me' component={ About } />
    </HashRouter>,
    document.getElementById('app')
)