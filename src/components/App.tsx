import * as React from 'react';
import { Link } from 'react-router-dom';

import dataAccess from '../data/dataAccess';

export class App extends React.Component<any, any> {
    constructor(props:  Readonly<any>) {
        super(props);
        dataAccess.googleSheets('homepage');
    }

    render() {
        return (
            <div>
                <h1>Holt Walborn</h1>
                <p>Hello, my name is <i>Holt Walborn</i> welcome to my page and it's totally under construction</p>
                <Link id="header-title" to="/page2">TO PAGE 2</Link>
            </div>
        )
    }
}