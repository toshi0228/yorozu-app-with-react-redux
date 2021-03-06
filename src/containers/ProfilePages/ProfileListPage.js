import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Pagination } from 'antd'
import { fetchProfileList, profileDetailInitialize } from '../../store/actions/profile'

// components
import ProfileList from '../../components/profile/ProfileList/pc/index'
import MobileProfileList from '../../components/profile/ProfileList/mobile/index'

import styles from '../../styles/ProfileListPage.module.scss'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// YOROZUのトップページ
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const ProfileListPage = (props) => {
  // まだプロフィールリストを読み込んでなければ、読み込む
  useEffect(() => {
    if (props.isLoading == false) {
      props.readProfileListEvents()
    }
  }, [props.isLoading])

  // プランページに移動した時に、前のプランプロフィールデータやプランデータが残っている可能性があるので初期化
  useEffect(() => {
    props.profileDetailInitializeEvent()
  }, [])

  return (
    <>
      {/* サイト説明 */}
      <Row type="flex" justify="center">
        <Col xs={0} md={22} lg={22} style={{ marginTop: 32 }}>
          <h3 style={{ textAlign: 'center' }}>あなたの憧れている職業・大学・生き方の人にインタビューしよう</h3>
          <h3 style={{ textAlign: 'center' }}>1人の人との出会いで、大きく人生が変わることがあるはず</h3>
        </Col>
        {/* スマホ用 */}
        <Col xs={22} md={0} style={{ marginTop: 32 }}>
          <p>あなたの憧れている職業・大学・生き方の人にインタビューしよう 1人の人との出会いで、大きく人生が変わることがあるはず</p>
        </Col>
      </Row>

      <Row type="flex" justify="center" className={styles.profileList}>
        {/* PC用 */}
        <Col xs={0} md={22} lg={18}>
          <ProfileList data={props.data} />
        </Col>
        {/* モバイル用 */}
        <Col xs={22} md={0}>
          <MobileProfileList data={props.data} />
        </Col>
      </Row>

      {/* </div> */}
      {/* ページの項目 */}
      {/* <Row type="flex" justify="center" style={{ marginBottom: 72 }}>
        <Col>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row> */}
    </>
  )
}

const mapStateToprops = (state) => ({
  data: state.profile,
  // プロフィールリストを読み込んだか
  isLoading: state.profile.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  readProfileListEvents: () => dispatch(fetchProfileList()),
  // プランページに移動した時に、前のプランプロフィールデータやプランデータが残っている可能性があるので
  // プランリストページに移動したら初期化する
  profileDetailInitializeEvent: () => dispatch(profileDetailInitialize()),
})

export default connect(mapStateToprops, mapDispatchToProps)(ProfileListPage)
