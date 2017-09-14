import React from 'react';
import { render } from 'react-dom';
import "../util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import Index from '../components/Pages/Index';

render( <Index /> , document.getElementById('app'));
