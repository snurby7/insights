import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home/home.component';

class InsightApp extends React.Component {
  render() {
    return (
      <div>
        <HomePage/>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
