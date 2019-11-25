import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Data from '../../Data/Data';

function renderDataPage() {
  const packetMock = {
    packets: [
      {
        fields: {
          avg_power_balance: '204',
          bat_a_temp: '170',
          bat_a_volt: '221',
          bat_b_temp: '187',
          bat_b_volt: '238',
          bat_c_temp: '170',
          bat_c_volt: '255',
          bat_d_temp: '187',
          bat_d_volt: '187',
          main_bus_volt: '187',
          recv_sig_str: '-84',
          sat_mission_phase: '2',
          spin_rate_z: '-17494',
          sys_stat_aocs: '170',
          sys_stat_com: '187',
          sys_stat_eps: '171',
          sys_stat_obc: '172',
          tether_current: '172',
          time_since_last_error_aoc: '2',
          time_since_last_error_com: '2',
          time_since_last_error_eps: '3',
          time_since_last_error_obc: '2',
          time_since_last_reset_com: '2',
          time_since_last_reset_eps: '3',
          time_since_last_reset_obc: '2',
          timestamp: '4158967389'
        },
        id: 1,
        packet_timestamp: '2019-11-24T12:05:00',
        receive_timestamp: '2019-11-22T23:23:28.773082'
      }
    ]
  };
  const telemetryConfMock = {
    fields: [
      {
        id: 'main_bus_volt',
        label: 'Main bus voltage',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'avg_power_balance',
        label: 'Average power balance',
        type: 'int',
        unit: 'Watts'
      },
      {
        id: 'bat_a_volt',
        label: 'Battery A voltage',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_b_volt',
        label: 'Battery B voltage',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_c_volt',
        label: 'Battery C voltage',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_d_volt',
        label: 'Battery D voltage',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_a_temp',
        label: 'Battery A Temperature',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_b_temp',
        label: 'Battery B Temperature',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_c_temp',
        label: 'Battery C Temperature',
        type: 'int',
        unit: 'Volts'
      },
      {
        id: 'bat_d_temp',
        label: 'Battery D Temperature',
        type: 'int',
        unit: 'Volts'
      }
    ],
    graphs: [
      {
        title: 'Battery voltages',
        type: 'line',
        xAxis: 'timestamp',
        yAxis: ['bat_a_volt', 'bat_b_volt', 'bat_c_volt', 'bat_d_volt']
      }
    ],
    msgTimestamp: {
      id: 'timestamp',
      type: 'unix_timestamp'
    },
    prefix: 'data.payload'
  };
  // @ts-ignore
  return render(<Data decodedPackets={packetMock} telemetryConfiguration={telemetryConfMock} />);
}

describe('Find time-location-map class', () => {
  afterEach(cleanup);
  it('should find time-location-map class', async () => {
    const dataPage = renderDataPage();
    const timeLocationMapInDocument = await dataPage.findByTestId('time-location-map');
    expect(timeLocationMapInDocument).toBeInTheDocument();
  });
});

describe('Find satellite-data class', () => {
  afterEach(cleanup);
  it('should find satellite-data class', async () => {
    const dataPage = renderDataPage();
    const satelliteDataInDocument = await dataPage.findByTestId('satellite-data');
    expect(satelliteDataInDocument).toBeInTheDocument();
  });
});
