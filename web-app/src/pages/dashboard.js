import React from 'react'
import GaugeChart from 'react-gauge-chart'
import Sidebar from '../components/sidebar'

export default () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div class="header">
          <div class="container-fluid">
            <div class="header-body">
              <div class="row align-items-end">
                <div class="col">
                  <h6 class="header-pretitle">Overview</h6>

                  <h1 class="header-title">Dashboard</h1>
                </div>
                <div class="col-auto">
                  <span class="chart-legend-item">
                    <i
                      class="chart-legend-indicator"
                      style={{ backgroundColor: '#2C7BE5' }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="card">
                <div className="card-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h4 class="card-header-title">Temperature</h4>
                    </div>
                    <div class="col-auto">10 minutes ago</div>
                  </div>
                </div>
                <div className="card-body">
                  <GaugeChart
                    id="gauge-chart4"
                    nrOfLevels={20}
                    arcPadding={0.05}
                    cornerRadius={3}
                    percent={0.6}
                    textColor="#000000"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="card">
                <div className="card-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h4 class="card-header-title">Humidity</h4>
                    </div>
                    <div class="col-auto">10 minutes ago</div>
                  </div>
                </div>
                <div className="card-body">
                  <GaugeChart
                    id="gauge-chart1"
                    nrOfLevels={3}
                    percent={0.86}
                    textColor="#000000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
