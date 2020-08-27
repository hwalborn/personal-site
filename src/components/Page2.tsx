import * as React from 'react';
import { Link } from 'react-router-dom'

require('../style/page2.less');

export class Page2 extends React.Component<{}, {}> {
    constructor(props:  Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>HI HOLT FROM PAGE 2</h1>
                <p>This is black <span id="holt">But this is white</span></p>
                <Link to="/">BACK TO HOMEPAGE</Link>
            </div>
        )
    }
}