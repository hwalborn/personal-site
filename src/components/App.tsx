import * as React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Document, pdfjs } from 'react-pdf';

import { DropNav } from './dummy/DropNav';
import { DragNav } from './dummy/DragNav';
import { Navigation } from '../env/dropTypes';
import dataAccess from '../data/dataAccess';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type State = {
    summary: string;
    isDragging: boolean;
}

export class App extends React.Component<any, State> {
    constructor(props:  Readonly<any>) {
        super(props);
        this.state = {
            summary: '',
            isDragging: false,
        }
        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    async componentWillMount() {
        var response: any = await dataAccess.googleSheets('homepage');
        this.setState({summary: response.Summary});
    }

    // hacky DOM manipulation for hiding the home link when on the homepage
    componentDidMount() {
        document.getElementById('back-home').classList.value = 'home-hide';
    }

    componentWillUnmount() {
        document.getElementById('back-home').classList.value = '';
    }

    startDrag() {
        this.setState({isDragging: true});
    }

    endDrag() {
        this.setState({isDragging: false});
    }

    render() {
        const dropNavs = Object.keys(Navigation).map((nav, i) => {
            return (
                <DropNav key={i}
                         navigate={() => {
                             const pdfRoute = Navigation[nav];
                             if (pdfRoute) {
                                var link = document.createElement('a');
                                link.href = pdfRoute;
                                link.target = 'blank';
                                link.dispatchEvent(new MouseEvent('click'));
                             } else {
                                this.props.history.push(`/${nav.toLowerCase()}`)
                             }
                            }}
                         navigateTo={nav.replace(/_/g, ' ')}
                         className={this.state.isDragging ? 'drop-nav dragging' : 'drop-nav'}/>
                        )})
        return (
            <div>
                <h1>Holt Walborn</h1>
                <p>{this.state.summary}</p>
                <DndProvider backend={HTML5Backend}>
                    <DragNav className={this.state.isDragging ? '' : 'drag-nav'}
                             onDragBegin={this.startDrag}
                             onDragEnd={this.endDrag}/>
                    <div id="drop-nav-container">
                        {dropNavs}
                    </div>
                </DndProvider>
            </div>
        )
    }
}