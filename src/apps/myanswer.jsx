import React from 'react';
import { render } from 'react-dom';
import "@/util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import AnswerList from '@/components/Pages/Answer/AnswerList';

render( <AnswerList /> , document.getElementById('app'));
