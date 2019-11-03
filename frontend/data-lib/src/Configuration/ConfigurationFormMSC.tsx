import React from 'react';

/**
 * Component for configuring MSC
 */
class ConfigurationFormMSC extends React.Component {
  render() {
    return (
      <div>
        Misison Control
        <form>
          <label>
            Relay-Enabled:
            <input type="checkbox" />
          </label>
          <br />
          <label>
            MCS-Relay-URL:
            <input type="text" />
          </label>
          <br />
          <label>
            MCS-Configuration-URL:
            <input type="text" />
          </label>
          <br />
          <label>
            Receiver-Callsign:
            <input type="text" />
          </label>
          <br />
          <label>
            Norad-ID:
            <input type="number" />
          </label>
        </form>
      </div>
    );
  }
}

export default ConfigurationFormMSC;
