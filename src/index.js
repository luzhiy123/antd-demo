import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/zh-cn';

import './index.css';
import RouterConfig from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterConfig />, document.getElementById('root'));
registerServiceWorker();