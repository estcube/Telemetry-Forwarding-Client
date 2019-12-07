import * as React from 'react';
import { WithStyles, Typography, createStyles, withStyles, Theme } from '@material-ui/core';
import { Prompt } from 'react-router';
import ConfigurationFormUpdateButton from './ConfigurationFormComponents/ConfigurationFormUpdateButton';
import ConfigurationFormSections from './ConfigurationFormComponents/ConfigurationFormSections';

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

interface ConfigurationFormsProps extends WithStyles<typeof styles> {
  confValues: { [key: string]: { [key: string]: any } };
  handleConfPost: (event: React.MouseEvent<HTMLButtonElement>, data: { [key: string]: { [key: string]: any } }) => void;
  dataPosted: true | false | null;
  confPostLoading: true | false;
  errorMessage: string | null;
}

type ConfigurationFormsState = {
  confValues: { [key: string]: { [key: string]: any } };
  hasUnsavedChanges: boolean;
};

/**
 * Component for configuring the backend client
 */
class ConfigurationForms extends React.Component<ConfigurationFormsProps, ConfigurationFormsState> {
  constructor(props: ConfigurationFormsProps) {
    super(props);
    this.state = { hasUnsavedChanges: false, confValues: {} };
  }

  componentDidMount(): void {
    const { confValues } = this.props;
    this.setState({
      confValues
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: Readonly<ConfigurationFormsProps>, prevState: Readonly<ConfigurationFormsState>): void {
    const { hasUnsavedChanges } = this.state;
    const { dataPosted } = this.props;
    if (dataPosted && !prevProps.dataPosted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasUnsavedChanges: false });
    }
    if (hasUnsavedChanges) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = () => undefined;
    }
  }

  componentWillUnmount(): void {
    window.onbeforeunload = null;
  }

  handleFormChange(
    event: React.ChangeEvent<HTMLInputElement>,
    confElemName: string,
    sectionName: string,
    inputType: string
  ) {
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
    this.setState({ confValues: copyOfConfValues, hasUnsavedChanges: true });
  }

  render() {
    const { confPostLoading, classes, handleConfPost } = this.props;
    const { confValues, hasUnsavedChanges } = this.state;

    return (
      <>
        <Prompt message="Are you sure that you want to leave? You have unsaved changes" when={hasUnsavedChanges} />
        <div className="conf-form" data-testid="conf-form">
          <div className={classes.root}>
            <Typography variant="h4" className={classes.text}>
              Configuration
            </Typography>
            <form className={classes.paperSlave}>
              <ConfigurationFormSections
                confValues={confValues}
                classes={classes}
                handleFormChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  confElemName: string,
                  sectionName: string,
                  inputType: string
                ) => this.handleFormChange(event, confElemName, sectionName, inputType)}
              />
            </form>
            <ConfigurationFormUpdateButton
              confPostLoading={confPostLoading}
              handleClick={event => {
                handleConfPost(event, confValues);
              }}
              allowPosting={hasUnsavedChanges}
              classes={classes}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ConfigurationForms);
