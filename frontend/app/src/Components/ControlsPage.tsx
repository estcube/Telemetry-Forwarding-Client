import * as React from 'react';
import {CircularProgress, Typography, createStyles, WithStyles, withStyles} from '@material-ui/core';
import TNCStatus from './TNCStatus';
import LocationDataMap from './LocationDataMap';

type ControlsPageState = {
    dataFetchErrored: boolean;
    loading: boolean;
};

const styles = () =>
    createStyles({
        tncConns: {
            display: 'flex',
            flexDirection: 'column',
            margin: 16
        },
        topRow: {
            display: 'flex',
            flexDirection: 'row'
        },
        flexFill: {
            flexGrow: 1
        },
        locationMap: {
            margin: 16
        }
    });

class ControlsPage extends React.Component<WithStyles<typeof styles>, ControlsPageState> {
    constructor(props: WithStyles<typeof styles>) {
        super(props);
        this.state = {
            dataFetchErrored: false,
            loading: false
        };
    }

    render() {
        const {classes} = this.props;
        const {loading, dataFetchErrored} = this.state;
        let content;
        if (loading) {
            content = <CircularProgress/>;
        } else if (!loading && dataFetchErrored) {
            content = (
                <Typography variant="h6">Could not connect to the client. Try re-launching your client to fix
                    this.</Typography>
            );
        } else {
            content = (
                <div>

                </div>
            );
        }
        return (
            <div data-testid="confDiv">
                <div className={classes.topRow}>
                    <div className={classes.tncConns}>
                        <TNCStatus/>
                    </div>
                    <div className={classes.flexFill}/>
                    <div className={classes.locationMap}>
                        <LocationDataMap/>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

export default withStyles(styles)(ControlsPage);