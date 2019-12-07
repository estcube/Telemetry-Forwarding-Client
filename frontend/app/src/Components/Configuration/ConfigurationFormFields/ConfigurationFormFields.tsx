import React from 'react';
import ConfigurationFormTextField from './ConfigurationFormTextField';
import ConfigurationFormRadioField from './ConfigurationFormRadioField';
import ConfigurationFormDropdownField from './ConfigurationFormDropdownField';

interface ConfigurationFormFieldsProps {
  confValues: { [key: string]: { [key: string]: any } };
  sectionName: string;
  handleFormChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    confElemName: string,
    sectionName: string,
    inputType: string
  ) => void;
}

/**
 * Component for drawing custom legend when legend is toggled.
 */
class ConfigurationFormFields extends React.Component<ConfigurationFormFieldsProps> {
  render() {
    const { confValues, sectionName, handleFormChange } = this.props;
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
        if (confElemType === 'str' || confElemType === 'int' || confElemType === 'float') {
          return (
            <ConfigurationFormTextField
              confElemType={confElemType}
              textChangeHandler={event => handleFormChange(event, confElemName, sectionName, 'text')}
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
              radioChangeHandler={event => handleFormChange(event, confElemName, sectionName, 'radio')}
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
              dropdownChangeHandler={event => handleFormChange(event, confElemName, sectionName, 'text')}
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
}

export default ConfigurationFormFields;
