import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';

class App extends Component {

    render() {
        return (
            <div className="container">
                <ul>
                    <li><IndexLink to='/' activeClassName="active">Home</IndexLink></li>
                    <li><Link to='/notfound'>NotFound</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default App;