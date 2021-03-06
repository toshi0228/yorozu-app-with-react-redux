import React from 'react'
import { Row, Col } from 'antd'

import styles from './index.module.scss'

// ======================================================================
// createProfilePage mobileの プロフィールで登録した画像を見れる
// ======================================================================

// createProfilePageから、registeredProfileが渡ってくる
export const RsegisteredProfile = ({ registeredProfile }) => {
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // プロフィール画像 props.registeredProfile.profileImageが
  // undifinなら初期値をセットする
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const toggleProfileImage = () => {
    if (registeredProfile.profileImage) {
      return <img style={{ height: 150, width: 150, borderRadius: '50%' }} src={registeredProfile.profileImage} />
    } else {
      return (
        <div className={styles.profileNoImage}>
          <div style={{ fontSize: 16 }}>No Image</div>
        </div>
      )
    }
  }
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // よろずやのサムネール画像 props.registeredProfile.yorozuyaThumbnailImageが
  // undifinなら、初期値をリセットする
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const toggleThumbnailImage = () => {
    if (registeredProfile.yorozuyaThumbnailImage) {
      return <img style={{ height: 208, width: '100%' }} src={registeredProfile.yorozuyaThumbnailImage} />
    } else {
      //   return <img style={{ height: 208, width: '100%' }} src="https://toyoake-seinenbu.com/wp/wp-content/uploads/2018/11/sample_img.gif" />
      return (
        <div className={styles.thumbnailNoImage}>
          <div style={{ fontSize: 16 }}>No Image</div>
        </div>
      )
    }
  }

  return (
    <>
      {/* プロフィール画像 */}
      <Row type="flex" justify="center" style={{ marginTop: 80 }}>
        <p style={{ marginTop: 8 }}>※現在使われているプロフィール画像</p>
        <Col>{toggleProfileImage()}</Col>
      </Row>

      {/* サムネール画像 */}
      <Row type="flex" justify="center" style={{ marginTop: 64 }}>
        <p style={{ marginTop: 8 }}>※現在使われているサムネール画像</p>
        <Col>{toggleThumbnailImage()}</Col>
      </Row>
    </>
  )
}

export default RsegisteredProfile
