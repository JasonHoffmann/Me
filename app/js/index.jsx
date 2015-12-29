//import React from 'react';
import page from 'page';
import header from './components/header';
import index from './index/controller';

header.render();


page.base('/me');
page('/', index.render());
page();