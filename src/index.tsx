import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'

import { App } from './components/App';
import { Page2 } from './components/Page2';
import { Skills } from './components/Skills';

require('./style/index.less');

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path='/' component={ App } />
            <Route exact path='/page2' component={ Page2 } />
            <Route exact path='/skills' component={ Skills} />
        </div>
    </HashRouter>,
    document.getElementById('app')
)