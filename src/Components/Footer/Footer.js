import React, { Component } from "react";

import './Footer.css';

class Footer extends Component {
    render() {
        return(
            <footer>
                <div>Press enter to add a new to-do</div>
                <div>Press ctrl+enter to mark the to-do complete</div>
                <div>Press ctrl+backspace to delete a to-do</div>
            </footer>
        )
    }
}

export default Footer;