import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import ConfigurationFormFields from '../ConfigurationFormFields/ConfigurationFormFields';

interface ConfigurationFormSectionsProps {
  confValues: { [key: string]: { [key: string]: any } };
  classes: { [key: string]: any };
  handleFormChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    confElemName: string,
    sectionName: string,
    text: string
  ) => void;
}

/**
 * Component for drawing custom legend when legend is toggled.
 */
class ConfigurationFormSections extends React.Component<ConfigurationFormSectionsProps> {
  render() {
    const { classes, confValues, handleFormChange } = this.props;
    return Object.keys(confValues).map(sectionName => {
      return (
        <ExpansionPanel key={sectionName} defaultExpanded className={classes.extensionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls={sectionName} id={sectionName}>
            <Typography variant="h5">{sectionName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.section}>
            <ConfigurationFormFields
              confValues={confValues}
              sectionName={sectionName}
              handleFormChange={handleFormChange}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  }
}

export default ConfigurationFormSections;
