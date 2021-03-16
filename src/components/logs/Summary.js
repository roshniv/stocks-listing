import React from "react";
import propTypes from "prop-types";

class Summary extends React.Component {
    render () {
        if (this.props.stockSummary && Object.keys(this.props.stockSummary).length === 0)
            return <div/>;

        var self = this;
        var stockOptions = Object.keys(self.props.stockSummary).map(function(key) {
                return (
                    <div className='row' key={key}>
                        <div className='col-sm-4'>{key}</div>
                        <div className='col-sm-2'>{self.props.stockSummary[key]['starting']}</div>
                        <div className='col-sm-2'>{self.props.stockSummary[key]['lowest']}</div>
                        <div className='col-sm-2'>{self.props.stockSummary[key]['highest']}</div>
                        <div className='col-sm-2'>{self.props.stockSummary[key]['current']}</div>
                    </div>
                );
            });
        return (
            <div>
                <div className='row'>
                    <div className='col-sm-4 text-bold'>Stock</div>
                    <div className='col-sm-2 text-bold'>Starting</div>
                    <div className='col-sm-2 text-bold'>Lowest</div>
                    <div className='col-sm-2 text-bold'>Highest</div>
                    <div className='col-sm-2 text-bold'>Current</div>
                </div>
                {stockOptions}
            </div>
        );
    }
}

Summary.propTypes = {
    stockSummary: propTypes.object.isRequired
};


export default Summary;
