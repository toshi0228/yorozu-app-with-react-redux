import React from 'react'
import { Col, Row } from 'antd'
import TogglePlanBtn from '../TogglePlanBtn'
import styles from './index.module.scss'

// ====================================================================
// 詳細ページのプランのセクション
// 24分割で, 左空白3、左サイド12,右サイド6 右空白3
// プランの部分は左の12の部分
// ====================================================================

// planDataは、profileDetailPage => componentのprofileDetail => leftSideから渡ってくる
const DetailPlanSection = ({ planData }) => {
  return (
    <>
      {/* プランのイメージ画像 */}
      <Row>
        <Col xs={24} md={24}>
          {/* <img alt="example" src={planData.image} style={{ width: '100%', height: 360, borderRadius: 8 }} /> */}
          <img alt="example" src={planData.image} className={styles.planImage} />
        </Col>
      </Row>

      {/* プランのタイトル */}
      <div style={{ marginBottom: 48 }}>
        {/* タイトル */}
        <Row style={{ marginTop: 40 }}>
          {/* <Col offset={2}> */}
          <Col>
            <h2>{planData.title}</h2>
          </Col>
        </Row>

        {/*料金 */}
        <Row>
          {/* <Col offset={2}> */}
          <Col>
            <h3>￥{planData.price}円</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>

        {/* プランの説明 */}
        <Row style={{ paddingTop: 20 }}>
          <Col span={24}>
            {/* {`詳細プランのコンポーネント`} */}
            {planData.description}
          </Col>
        </Row>

        {/* プラン(リクエスト・契約)ボタン */}
        <Row gutter={[32, 32]} type="flex" style={{ marginTop: 20 }} justify="end">
          <Col style={{ marginBottom: 20 }}>
            <TogglePlanBtn planData={planData} />
          </Col>
        </Row>

        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DetailPlanSection
