import * as React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Paper, WithStyles, Typography } from '@material-ui/core';
import ConfigurationFormTextField from './ConfigurationFormFields/ConfigurationFormTextField';
import ConfigurationFormRadioField from './ConfigurationFormFields/ConfigurationFormRadioField';
import ConfigurationFormDropdownField from './ConfigurationFormFields/ConfigurationFormDropdownField';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      textAlign: 'center'
    },
    text: {
      paddingBottom: theme.spacing(2)
    },
    papers: {
      padding: theme.spacing(4, 0)
    },
    forms: {
      textAlign: 'center',
      display: 'inline-block',
      borderStyle: 'solid',
      borderColor: 'grey',
      borderRadius: '5px',
      padding: theme.spacing(0, 2),
      margin: theme.spacing(0, 2)
    }
  });

interface ConfigurationProps extends WithStyles<typeof styles> {
  confValues: { [key: string]: { [key: string]: any } };
}

type ConfigurationState = {
  confValues: { [key: string]: { [key: string]: any } };
};

/**
 * Component for configuring the backend client
 */
class Configuration extends React.Component<ConfigurationProps, ConfigurationState> {
  constructor(props: ConfigurationProps) {
    super(props);
    this.state = { confValues: {} };
  }

  componentDidMount(): void {
    const { confValues } = this.props;
    this.setState({ confValues });
  }

  handleFormChange(event: any, confElemName: string, sectionName: string, inputType: string) {
    const { confValues } = this.state;
    const copyOfConfValues = confValues;
    if (inputType === 'text') {
      copyOfConfValues[sectionName][confElemName].value = event.target.value;
    } else if (inputType === 'radio') {
      copyOfConfValues[sectionName][confElemName].value = event.target.checked;
    }
    this.setState({ confValues: copyOfConfValues });
  }

  renderFormFields() {
    const { confValues } = this.state;
    return Object.keys(confValues).map(sectionName => {
      const confSectionValues = confValues[sectionName];
      return Object.keys(confSectionValues).map(confElemName => {
        const confElemParams = confSectionValues[confElemName];
        const confElemType = confElemParams.type;
        const confElemValue = confElemParams.value ? confElemParams.value : '';
        const confElemRequiresRestart = !!confElemParams.requiresRestart;
        if (confElemType === 'str' || confElemType === 'int') {
          return (
            <ConfigurationFormTextField
              confElemType={confElemType}
              textChangeHandler={event => this.handleFormChange(event, confElemName, sectionName, 'text')}
              key={confElemName}
              confElemName={confElemName}
              confElemRequiresRestart={confElemRequiresRestart}
              confElemValue={confElemValue}
            />
          );
        }
        if (confElemType === 'bool') {
          return (
            <ConfigurationFormRadioField
              radioChangeHandler={event => this.handleFormChange(event, confElemName, sectionName, 'radio')}
              key={confElemName}
              confElemName={confElemName}
              confElemRequiresRestart={confElemRequiresRestart}
              confElemValue={confElemValue}
            />
          );
        }
        if (confElemType === 'select') {
          const confElemOptions = confElemParams.options;
          const confElemDisabledOptions = confElemParams.disabledOptions ? confElemParams.disabledOptions : [];
          const allConfElemOptions = confElemOptions.concat(confElemDisabledOptions);
          const confElemOptionsObject = allConfElemOptions.map((elem: string) => {
            return { label: elem, value: elem };
          });
          return (
            <ConfigurationFormDropdownField
              dropdownChangeHandler={event => this.handleFormChange(event, confElemName, sectionName, 'text')}
              key={confElemName}
              confElemRequiresRestart={confElemRequiresRestart}
              confElemValue={confElemValue}
              confElemName={confElemName}
              confElemOptions={confElemOptionsObject}
              confElemDisabledOptions={confElemDisabledOptions}
            />
          );
        }
        return <div key={confElemName} />;
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="conf-form" data-testid="conf-form">
        <div className={classes.root}>
          <Paper className={classes.papers}>
            <Typography variant="h4" className={classes.text}>
              Configuration
            </Typography>
            <form>{this.renderFormFields()}</form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Configuration);
