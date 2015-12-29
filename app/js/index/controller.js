import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';

var index = {
	render: function() {
		ReactDOM.render( React.createElement( Index, {} ), document.getElementById( 'main' ) );
	}

}

export default index;