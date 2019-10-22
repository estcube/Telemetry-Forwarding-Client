import React from 'react';

const ConfigurationFormMSC = () => {

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
};

export default ConfigurationFormMSC;