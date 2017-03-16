// app.js

import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import NewsList from './NewsList.js';


render(<NewsList />, $('#content')[0]);