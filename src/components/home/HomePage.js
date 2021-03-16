import React from "react";
import { Link } from "react-router-dom";
import LogFile from "../logs/LogFile";
import Summary from "../logs/Summary";
import PauseButton from "../button/PauseButton";
import { connect } from "react-redux";
import * as logActions from "../../redux/actions/logActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";


class HomePage extends React.Component {
    state = {
        allLogs: [],
        logsToDisplay: [],
        stockSummary: {},
        loading: true
    };

    componentDidMount() {
        const { actions } = this.props;

        setInterval(
            function() {
                actions.loadLogs().catch(error => {
                    console.log("Loading logs failed" + error);
                });
            }
            .bind(this),
            2000
          );
    }

    getDateTime = () => {
        var now     = new Date();
        var year    = now.getFullYear();
        var month   = now.getMonth()+1;
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds();
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }
        var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
         return dateTime;
    };

    updateLogsTable = () => {
        console.log(this.state.allLogs);
        if(this.props.logs.length > 0) {
            this.state.allLogs.unshift({
                timeStamp: this.getDateTime(),
                logs: this.props.logs
            });

            if (this.state.loading) {
                this.state.logsToDisplay.unshift({
                    timeStamp: this.getDateTime(),
                    logs: this.props.logs
                });
            }
        }
    };

    updateSummaryData = () => {
        var stockSummary = {};
        if (this.state.allLogs) {
            for (var i=this.state.allLogs.length-1; i>0; i--){
                var logs = this.state.allLogs[i]['logs'];
                for (var j=0; j<logs.length; j++) {
                    if (!stockSummary[logs[j]['code']]) {
                        stockSummary[logs[j]['code']] = {
                            'starting': logs[j]['price'],
                            'lowest': logs[j]['price'],
                            'highest': logs[j]['price'],
                            'current': logs[j]['price']
                        }
                    } else {
                        stockSummary[logs[j]['code']]['current'] = logs[j]['price'];
                        if (stockSummary[logs[j]['code']]['lowest'] > logs[j]['price']) {
                            stockSummary[logs[j]['code']]['lowest'] = logs[j]['price'];
                        }
                        if (stockSummary[logs[j]['code']]['highest'] < logs[j]['price']) {
                            stockSummary[logs[j]['code']]['highest'] = logs[j]['price'];
                        }

                    }
                }

            }
        }
        return stockSummary;
    };

    handleButtonClick = (oldState) => {
        this.setState({'loading': !oldState});
    };

    render () {
        var logsToDisplay = this.state.logsToDisplay;
        this.updateLogsTable();

        var stockSummary = this.updateSummaryData();
        return (
            <div className="row">
                <div className="col-sm-6 logs-container">
                    <div className="row border-bottom border-dark pb-2 pt-2 pl-2">
                        <h3>Logs</h3>
                        <PauseButton
                            loading={this.state.loading}
                            onButtonClick={this.handleButtonClick} />
                    </div>
                    <LogFile
                        allLogs={logsToDisplay}
                    />
                </div>
                <div className="col-sm-6 summary-container">
                    <div className="border-bottom border-dark pb-2 pt-2 pl-2">
                        <h3>Summary</h3>
                    </div>
                    <Summary
                            stockSummary={stockSummary}
                        />
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    logs: propTypes.array.isRequired,
    actions: propTypes.object.isRequired
  };

function mapStateToProps(state) {
return {
        logs: state.logs
    };
}


function mapDispatchToProps(dispatch) {
    return {
      actions: {
        loadLogs: bindActionCreators(logActions.loadLogs, dispatch)
      }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (HomePage);

