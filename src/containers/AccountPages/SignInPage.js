import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn, resetErrorMessage } from '../../store/actions/account'
import { Button, Col, Row, Form, Input, Icon } from 'antd'

import styles from '../../styles/SignInPage.module.scss'

const SignInPage = (props) => {
  // ページ遷移しても、エラーメッセージが残っている場合があるので最初に消す
  useEffect(() => {
    props.resetErrorMessage()
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    props.singIn({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Row className={styles.signInPageWrap} type="flex" align="middle" justify="center">
        <Col xs={24} md={24}>
          {/* <h2 style={{ textAlign: 'center', marginTop: 48 }}>ログイン</h2> */}
          <h2 style={{ textAlign: 'center' }}>ログイン</h2>
          <p style={{ textAlign: 'center', marginTop: 40 }}>メールアドレスとパスワードを入力してください。</p>
          {props.isSignFailure && (
            <p style={{ textAlign: 'center', color: 'red', fontSize: 8 }}>メールアドレスまたは、パスワード間違いがあります</p>
          )}

          {/* PC用 メールアドレスの入力 */}
          <Form onSubmit={onSubmit}>
            <Form.Item name="username" style={{ marginTop: 40 }}>
              {/* メールアドレスを入力する項目 */}
              <Row type="flex" justify="center">
                {/* <Col xs={18} md={8} style={{ background: 'white' }}> */}
                <Col xs={18} lg={8} style={{ background: 'white' }}>
                  <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="メールアドレス"
                    size="large"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item name="password">
              {/* パスワードの入力項目 */}
              <Row type="flex" justify="center" style={{ marginTop: 8 }}>
                <Col xs={18} lg={8}>
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    placeholder="パスワード"
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row type="flex" justify="center">
                <Col xs={12} lg={4}>
                  {/* ボタンを中央に寄せる */}
                  <Button type="primary" htmlType="submit" block={true} size="large" style={{ marginTop: 32 }}>
                    ログイン
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  isSignFailure: state.account.isSignInFailure,
})

const mapDispatchToProps = (dispatch) => ({
  singIn: (formProps) => dispatch(signIn(formProps)),
  // エラーメッセージを消す
  resetErrorMessage: () => dispatch(resetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)

// =====================================================================================
// funcA()()
// 非同期の場合、関数の実行後、関数が返ってくるので、関数を実行するためにもう一度()をつける
// =====================================================================================

// =====================================================================================
// 2020 8 19
// antのボタンにblock trueを入れると、親のコンポーネントの大きさになる!

// <Button type="primary" htmlType="submit" block={true} >
// ログイン
// </Button>
// =====================================================================================
