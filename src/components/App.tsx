import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { pdfjs } from 'react-pdf';

import { DropNav } from './dummy/DropNav';
import { DragNav } from './dummy/DragNav';
import { Navigation } from '../types/dropTypes';
import dataAccess from '../data/dataAccess';
import { AppState, HomepageText} from '../types';
import { usePreview } from 'react-dnd-preview';
 
const DragBall = () => {
    const {display, style} = usePreview();
    if (!display) {
        return null;
    }
    return <div className="drag-ball" style={style}>Nav</div>;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const providerOptions = {
    enableMouseEvents: true
};

export class App extends React.Component<any, AppState> {
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
        const data = dataAccess.staticData<HomepageText>('homepage');
        this.setState({summary: data.Summary});
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
                <DndProvider backend={TouchBackend} options={providerOptions}>
                    <DragNav className={this.state.isDragging ? '' : 'drag-nav'}
                             onDragBegin={this.startDrag}
                             onDragEnd={this.endDrag}/>
                    <DragBall />
                    <div id="drop-nav-container">
                        {dropNavs}
                    </div>
                </DndProvider>
            </div>
        )
    }
}