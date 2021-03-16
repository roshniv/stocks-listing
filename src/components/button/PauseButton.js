import React from "react";
import propTypes from "prop-types";

class PauseButton extends React.Component {
    render () {
        return (
            <button
                className="btn btn-primary align-right"
                onClick={() => this.props.onButtonClick(this.props.loading)}
            >
                {this.props.loading ? 'Pause' : 'Resume'}
            </button>
        );
    }
}

PauseButton.propTypes = {
    loading: propTypes.bool.isRequired,
    onButtonClick: propTypes.func.isRequired
};


export default PauseButton;
