import React from 'react';
import { render } from 'react-dom';
import "../util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import ConcernList from '../components/Pages/Concern/ConcernList';

render( <ConcernList /> , document.getElementById('app'));
