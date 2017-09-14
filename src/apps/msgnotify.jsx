import React from 'react';
import { render } from 'react-dom';
import "@/util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import MsgList from '@/components/Pages/Notify/MsgList';

render( <MsgList /> , document.getElementById('app'));
