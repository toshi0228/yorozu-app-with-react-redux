import { SIGN_IN_ACCOUNT } from '../actionTypes'
import { postSignIn, postSignUp, postTokenVerify } from '../../services/authApiRequest'
import { push } from 'connected-react-router'
import { setAuthHeader, getYorozuId } from '../../services/ApiRequest'
import jwt from 'jwt-decode'
import routes from '../../routes'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// tokenがあるか判断
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

export const isToken = (token) => (dispatch) => {
  console.log('トークンをチェックします')
  postTokenVerify(token)
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ログイン処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const signIn = (formProps) => (dispatch) => {
  // postSignInでJWTを受け取るため,サーバーと通信する
  // データベースにないアカウントなら、失敗する。うまくいけば、JWTが帰ってくる
  return postSignIn(formProps)
    .then((token) => {
      // dajngo rest framework からは{regresh:"",acccess:""}という形でjwtが返ってくる
      const decodeJwt = jwt(token.data.access)

      // jwtをデコードしたあと、ユーザーIDを取り出す
      const userId = decodeJwt.user_id

      // よろずIDを取得するため。サーバーと通信
      // ユーザーIDで情報管理すれば、便利かもしれないが、yorozuIdでprofile情報などを管理する
      getYorozuId(userId).then((res) => {
        // accountReducerにセットする
        dispatch(
          signInAccount({
            authToken: { ...token.data },
            yorozuId: res.data.yorozuId,
          })
        )
      })

      dispatch(push(routes.memberTop()))
    })
    .catch((e) => {
      console.log(`${e} ログイン失敗`)
    })
}

// ログインのアクションクリエーター
const signInAccount = (user) => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: { ...user, isLoggedIn: true },
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 新規登録処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const signUp = (formProps) => (dispatch) => {
  // 新規登録を行う
  postSignUp(formProps).then((res) => {
    // 新規登録が完了したら、アクセストークンをもらいにいく
    postSignIn(formProps).then((res) => {
      // リクエストをするときにアクセストークンをヘッダーにセットする
      setAuthHeader(res.data)
      // accountReducerにトークンをセットする
      dispatch(signInAccount({ authToken: { ...res.data } }))
      dispatch(push('/create_plan'))
    })
  })
}

// =====================================================================================
// redux thunkが必要な処理
// 非同期の場合は、アクションではなく、関数を返す つまり内側の処理が終わった値を返す。
// =====================================================================================

// =====================================================================================
// jwtをデコードするためには、以下のものをimportする
// import jwt from 'jwt-decode';
// jwt(token)で,jwtの中身がデコードされる
// =====================================================================================
