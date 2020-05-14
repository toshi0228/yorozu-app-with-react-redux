import React from 'react'
import { Row, Col, Tabs } from 'antd'
import DashboardSale from '../../components/dashboard/dashboardSale/index'
import DashboardCarge from '../../components/dashboard/dashboardCharge'

const Dashboard = () => {
  function callback(key) {
    console.log(key)
  }
  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="center">
        <Col style={{ fontSize: 18 }}>依頼した万屋のリスト</Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
          <Tabs type="card" onChange={callback}>
            {/* 売り上げタブのコンテント */}
            <Tabs.TabPane tab="依頼中" key="1">
              <DashboardSale />
            </Tabs.TabPane>

            {/* 課金タブのコンテント */}
            <Tabs.TabPane tab="依頼履歴" key="2">
              <DashboardCarge></DashboardCarge>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard