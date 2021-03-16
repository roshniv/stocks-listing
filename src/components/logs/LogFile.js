import React from "react";
import propTypes from "prop-types";

class LogFile extends React.Component {
    render () {
        return (
            <>
                {this.props.allLogs.map((loggingInfo, index) => (
                    <div key={index} className="mb-3">
                        Updates for {loggingInfo.timeStamp}
                        {loggingInfo.logs.map(innerlog => (
                            <div key={innerlog.code}>{innerlog.code}: {innerlog.price}</div>
                        ))}
                    </div>
                ))}
            </>
        );
    }
}

LogFile.propTypes = {
    allLogs: propTypes.array.isRequired
};

export default LogFile;
