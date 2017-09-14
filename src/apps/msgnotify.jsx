import React from 'react';
import { render } from 'react-dom';
import "../util/flexible"

import '../assets/common.less';
import '../assets/mobile-reset.less';

import MsgList from '../components/Pages/Notify/MsgList';

render( <MsgList /> , document.getElementById('app'));