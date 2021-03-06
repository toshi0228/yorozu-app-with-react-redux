import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Input } from 'antd'

// component
import ImageForm from '../../../../form/ImageForm'

// action
import { createProfile, updateProfile, checkInputItem } from '../../../../../store/actions/profile'

import style from './index.module.scss'

// ======================================================================
// createProfilePageの右側 プロフィールの入力フォーム
// ======================================================================
// createProfilePageから、registeredProfile,accountIdが渡ってくる

const IpadInputProfile = ({ registeredProfile, accountId, checkInputItem, isToRegister, createProfileEvent, updateProfileEvent }) => {
  const [nickname, setNickname] = useState(registeredProfile['nickname'])
  const [yorozuyaName, setYorozuyaName] = useState(registeredProfile['yorozuyaName'])
  const [yorozuId, setYorozuId] = useState(registeredProfile['yorozuId'])
  const [profileDescription, setProfileDescription] = useState(registeredProfile['profileDescription'])
  const [profileImage, setProfileImage] = useState([])
  const [yorozuyaThumbnailImage, setYorozuyaThumbnailImage] = useState([])

  // プロフィールオブジェクト
  const profile = {
    accountId: accountId,
    nickname,
    yorozuyaName,
    yorozuId,
    profileImage,
    profileDescription,
    yorozuyaThumbnailImage,
  }

  // プロフィールの項目の配列 空白があるかどうか確認する時に必要
  const items = [nickname, yorozuyaName, yorozuId, profileImage, profileDescription, yorozuyaThumbnailImage]

  // 登録しているプロフィールを読み込んだら、inoutの中に値を挿入する
  // 以下のことをやらないと、registeredProfileのデータを取得した後も、inputが空白のままになってしまう。
  useEffect(() => {
    setNickname(registeredProfile['nickname'])
    setYorozuyaName(registeredProfile['yorozuyaName'])
    setYorozuId(registeredProfile['yorozuId'])
    setProfileDescription(registeredProfile['profileDescription'])
  }, [registeredProfile])

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 登録ボタンを押した時のイベント
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const register = () => {
    // props.registeredProfile.yorozuIdがあれば、登録内容の修正、なければ、新規登録
    if (registeredProfile.yorozuId) {
      // 登録内容の処理
      updateProfileEvent(profile)
    } else {
      // 新規登録の処理を行う前に、まず空白がないかチェックしてから、登録処理を行う
      // もし、ここで上手くいけば、props.isToRegisterがfalaeからtrueになる
      checkInputItem(items)
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // checkInputItemで、空白があるか確認したあとなければ、isToRegisterはtrueになり
  // 以下で登録の作業をを行う
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  if (isToRegister) {
    createProfileEvent(profile)
  }

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="center" style={{ marginTop: 16, marginBottom: 32 }}>
        <Col>
          <h3>プロフィールの登録</h3>
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>ニックネーム</h3>
          <Input value={nickname} size="large" onChange={(e) => setNickname(e.target.value)} placeholder="例) よろさん、ずっさん、よろろ" />
        </Col>
      </Row>

      {/*  よろずや名 */}
      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>インタビュイー名</h3>
          <Input
            size="large"
            value={yorozuyaName}
            onChange={(e) => setYorozuyaName(e.target.value)}
            placeholder="例) エンジニア、海外暮らし, 起業経験"
          />
        </Col>
      </Row>

      {/* プロフィール画像 */}
      <Row className={style.marginBottom}>
        <h3 className={style.title}>プロフィール画像</h3>
        <Col>
          <ImageForm image={profileImage} setImage={setProfileImage} />
        </Col>
      </Row>

      {/*  yorozuId */}
      <Row>
        <h3 className={style.title}>InterviewアプリのID</h3>
        <Col span={18}>
          <Input size="large" value={yorozuId} onChange={(e) => setYorozuId(e.target.value)} placeholder="例) yorozu、mornig、yororo" />
        </Col>
      </Row>

      {/* yorozuIdに関しての注意事項 */}
      <Row className={style.marginBottom}>
        <Col>
          <div style={{ fontSize: 8, color: 'red', marginTop: 8 }}>※一度決めたら変更できません。半角文字でお願いします)</div>
          <div style={{ fontSize: 8, color: 'red' }}>※このIDがあなたのプランのURLにもなります 例) http://interview/plan/●●●</div>
        </Col>
      </Row>

      {/* topページに掲載されるサムネ画像 */}
      <Row className={style.marginBottom}>
        <h3 className={style.title}>プランのトップページサムネール画像</h3>

        {/* よろずやのサムネール画像 (※よろずやのtopページで表示される画像になります) */}
        <Col>
          <ImageForm image={yorozuyaThumbnailImage} setImage={setYorozuyaThumbnailImage} />
        </Col>
      </Row>

      {/* プロフィール説明 */}
      <Row style={{ marginBottom: 48 }}>
        <h3 className={style.title}>プロフィール説明</h3>
        <Col>
          <Input.TextArea
            style={{ fontSize: 16 }}
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
            placeholder="どんな経験をしてきた人なのか書いて見てください"
          />
        </Col>
      </Row>

      {/* 送信ボタン */}
      <Row type="flex" justify="center" style={{ marginBottom: 48 }}>
        <Col>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 200 }} onClick={register}>
            登録
          </Button>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  // checkInputItemで、プロフィールの入力項目に空白がなければこの値がtrueになる
  isToRegister: state.profile.isToRegister,
})

const mapDispatchToProps = (dispatch) => ({
  // // プロフィールを作成する処理
  createProfileEvent: (profileData) => dispatch(createProfile(profileData)),
  // プロフィールの更新処理
  updateProfileEvent: (profileData) => dispatch(updateProfile(profileData)),
  // プロフィールの入力項目を確認する
  checkInputItem: (item) => dispatch(checkInputItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IpadInputProfile)
