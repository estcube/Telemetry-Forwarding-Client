import React from 'react';

const ConfigurationFormTNC = () => {

  return (
    <div>
      TNC Interface
      <form>
        <label>
          TNC-Protocol-Type:
          <select>
            <option value='KISS'>KISS</option>
            <option value='AGW'>AGW</option>
          </select>
        </label>
        <br />
        <label>
          TNC-Connection-Type:
          <select>
            <option value='TCP'>TCP</option>
            <option value='RS232'>RS232</option>
          </select>
        </label>
        <br />
        <label>
          TNC-IP
          <input type="text" />
        </label>
        <br />
        <label>
          TNC-Port:
          <input type="number" />
        </label>
        <br />
        <label>
          TNC-Device:
          <input type="text" />
        </label>
      </form>
    </div>
  );
};

export default ConfigurationFormTNC;