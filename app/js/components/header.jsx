import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    render() {
        return <header className="module-header">
        			<span className="module-header-slash">/</span>Me
        		</header>;
    }
}

var header = {
	render: function() {
		ReactDOM.render( React.createElement( Header, {} ), document.getElementById( 'header' ) );
	}
}

export default header;