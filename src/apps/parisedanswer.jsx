import React from 'react';
import { render } from 'react-dom';
import "../util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import ParisedAnswerList from '../components/Pages/ParisedAnswer/ParisedAnswerList';

render( <ParisedAnswerList /> , document.getElementById('app'));
