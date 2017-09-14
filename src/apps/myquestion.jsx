import React from 'react';
import { render } from 'react-dom';
import "../util/flexible"

import '@/common/common.less';
import '@/common/mobile-reset.less';

import QuestionList from '@/components/Pages/Question/QuestionList';

render( <QuestionList /> , document.getElementById('app'));
