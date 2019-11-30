import * as React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import {
  WithStyles,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  CircularProgress
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import ConfigurationFormTextField from './ConfigurationFormFields/ConfigurationFormTextField';
import ConfigurationFormRadioField from './ConfigurationFormFields/ConfigurationFormRadioField';
import ConfigurationFormDropdownField from './ConfigurationFormFields/ConfigurationFormDropdownField';
import ConfigurationSnackbar from './ConfigurationSnackbarComponents/ConfigurationSnackbar';

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
    section: {
      display: 'inherit'
    },
    paperSlave: {
      margin: theme.spacing(0, 2),
      display: 'inherit'
    },
    button: {
      margin: theme.spacing(4, 0, 0, 0)
    },
    extensionPanel: {
      border: '1px solid',
      borderRadius: 5
    }
  });

interface ConfigurationProps extends WithStyles<typeof styles> {
  confValues: { [key: string]: { [key: string]: any } };
  handleConfPost: (event: React.MouseEvent<HTMLButtonElement>, data: { [key: string]: { [key: string]: any } }) => void;
  dataPosted: true | false | null;
  confPostLoading: true | false;
  errorMessage: string | null;
}

type ConfigurationState = {
  confValues: { [key: string]: { [key: string]: any } };
  allowPosting: boolean;
};

/**
 * Component for configuring the backend client
 */
class Configuration extends React.Component<ConfigurationProps, ConfigurationState> {
  constructor(props: ConfigurationProps) {
    super(props);
    this.state = { allowPosting: false, confValues: {} };
  }

  componentDidMount(): void {
    const { confValues } = this.props;
    this.setState({
      confValues
    });
  }

  handleFormChange(event: any, confElemName: string, sectionName: string, inputType: string) {
    const { confValues } = this.state;
    const copyOfConfValues = JSON.parse(JSON.stringify(confValues));
    if (inputType === 'text') {
      copyOfConfValues[sectionName][confElemName].value = event.target.value;
    } else if (inputType === 'radio') {
      if (event.target.checked) {
        copyOfConfValues[sectionName][confElemName].value = 'True';
      } else {
        copyOfConfValues[sectionName][confElemName].value = 'False';
      }
    }
    this.setState({ confValues: copyOfConfValues, allowPosting: true });
  }

  renderFormSections() {
    const { confValues } = this.state;
    const { classes } = this.props;
    return Object.keys(confValues).map(sectionName => {
      return (
        <ExpansionPanel key={sectionName} defaultExpanded className={classes.extensionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls={sectionName} id={sectionName}>
            <Typography variant="h5">{sectionName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.section}>
            {this.renderFormFields(sectionName)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  }

  renderFormFields(sectionName: string) {
    const { confValues } = this.state;
    const confSectionValues = confValues[sectionName];
    return Object.keys(confSectionValues).map(confElemName => {
      const confElemParams = confSectionValues[confElemName];
      const confElemType = confElemParams.type;
      const confElemValue = confElemParams.value || '';
      const confElemRequiresRestart = !!confElemParams.requiresRestart;
      const confElemLabel = confElemParams.label;
      const confElemIsHidden = confElemParams.hidden;
      const confElemDescription = confElemParams.description || '';
      const confElemMinValue = confElemParams.min || null;
      const confElemMaxValue = confElemParams.max || null;
      const confElemMaxLen = confElemParams.max_len || null;
      if (!confElemIsHidden) {
        if (confElemType === 'str' || confElemType === 'url' || confElemType === 'int' || confElemType === 'float') {
          return (
            <ConfigurationFormTextField
              confElemType={confElemType}
              textChangeHandler={event => this.handleFormChange(event, confElemName, sectionName, 'text')}
              key={confElemName}
              confElemName={confElemLabel}
              confElemRequiresRestart={confElemRequiresRestart}
              confElemValue={confElemValue}
              confElemDescription={confElemDescription}
              confElemMinValue={confElemMinValue}
              confElemMaxValue={confElemMaxValue}
              confElemMaxLen={confElemMaxLen}
            />
          );
        }
        if (confElemType === 'bool') {
          let value = false;
          if (confElemValue === 'True' || confElemValue === true) {
            value = true;
          }
          return (
            <ConfigurationFormRadioField
              radioChangeHandler={event => this.handleFormChange(event, confElemName, sectionName, 'radio')}
              key={confElemName}
              confElemName={confElemLabel}
              confElemRequiresRestart={confElemRequiresRestart}
              confElemValue={value}
              confElemDescription={confElemDescription}
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
              confElemName={confElemLabel}
              confElemOptions={confElemOptionsObject}
              confElemDisabledOptions={confElemDisabledOptions}
              confElemDescription={confElemDescription}
            />
          );
        }
      }
      return <div key={confElemName} />;
    });
  }

  renderSnackbar = () => {
    const { confPostLoading, errorMessage } = this.props;
    const { dataPosted } = this.props;
    if (dataPosted !== null && !confPostLoading) {
      if (dataPosted) {
        return <ConfigurationSnackbar type="success" text="Configuration parameters updated!" />;
      }
      if (errorMessage) {
        return <ConfigurationSnackbar type="error" text={errorMessage} />;
      }
    }
    return <></>;
  };

  renderUpdateButton = () => {
    const { confPostLoading, classes, handleConfPost } = this.props;
    const { confValues, allowPosting } = this.state;
    if (!allowPosting) {
      return <></>;
    }
    if (!confPostLoading) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={event => {
            handleConfPost(event, confValues);
          }}
        >
          Update configuration
        </Button>
      );
    }
    return <CircularProgress data-testid="confDiv" />;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="conf-form" data-testid="conf-form">
        <div className={classes.root}>
          <Typography variant="h4" className={classes.text}>
            Configuration
          </Typography>
          <form className={classes.paperSlave}>{this.renderFormSections()}</form>
          {this.renderUpdateButton()}
          {this.renderSnackbar()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Configuration);
