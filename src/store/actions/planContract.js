import { postPlanContract, getMySentPlanContractList, getPurchasersList, patchPlanApprovalStatus } from '../../services/ApiRequest'
import {
  PLAN_CONTRACT_EVENT,
  READ_MY_SENT_PLAN_CONTRACT_EVENTS,
  CHECK_MY_SENT_PLAN_CONTRACT_STATUS,
  READ_CONTRACT_PLAN_LIST_EVENTS,
  READ_PURCHASERS_LIST_EVENT,
  CHECK_CLIENT_PURCHASE_PLAN_EVENT,
  PLAN_APPROVAL_EVENT,
} from '../actionTypes'

// =================================================================================
// プランの契約申請のイベント
// =================================================================================
export const planContract = (contractData) => (dispatch) => {
  postPlanContract(contractData).then((res) => {
    dispatch(sentPlanContract(res.data))
  })
}

// =================================================================================
// プランの契約申請後の、アクションクリエーター
// =================================================================================

export const sentPlanContract = (sentPlanContractData) => ({
  type: PLAN_CONTRACT_EVENT,
  payload: sentPlanContractData,
})

// =================================================================================
// 自分が送信したプラン契約の申請一覧を取得する
// =================================================================================
export const feachMySentPlanContract = (authToken) => (dispatch) => {
  getMySentPlanContractList(authToken).then((res) => {
    dispatch(readMyPlanContract(res))
  })
}

// =================================================================================
// 自分が送信したプランリクエストの一覧を取得する時に、使うアクションクリエーター
// =================================================================================

export const readMyPlanContract = (myPlanContractList) => {
  return {
    type: READ_MY_SENT_PLAN_CONTRACT_EVENTS,
    payload: myPlanContractList.data,
  }
}

// =================================================================================
// 自分が契約しているプラン一覧を取得する
// =================================================================================

export const readContractPlanList = () => {
  return {
    type: READ_CONTRACT_PLAN_LIST_EVENTS,
  }
}

// =================================================================================
// 自分のプランを購入してくれた人のリストを取得する
// =================================================================================

export const feachPurchasersList = (authToken) => (dispatch) => {
  getPurchasersList(authToken).then((res) => {
    dispatch(readPurchasersList(res))
  })
}

export const readPurchasersList = (purchasersList) => {
  return {
    type: READ_PURCHASERS_LIST_EVENT,
    payload: purchasersList.data,
  }
}

// =================================================================================
// プランページに移動した時に、ログインユーザーの契約申請の状態を確認する
// (契約申請を送信した事がある万屋ならには、契約申請をできないようにしたい)
// 自分が送った契約申請の状態 1. 契約申請を送信してない 2.承認されていない 3.承認された
// =================================================================================

export const checkMySentPlanContractStatus = (planOwnerYorozuId) => {
  return {
    type: CHECK_MY_SENT_PLAN_CONTRACT_STATUS,
    payload: planOwnerYorozuId,
  }
}

// =================================================================================
// 自分宛に届いたプランリクエストを承認する
// =================================================================================
// planRequestUserYorozuId => プランをリクエストしてくれたユーザーのyorozuId
export const planRequestApproval = (contractPlan) => (dispatch) => {
  patchPlanApprovalStatus(contractPlan).then((approvedPlanRequest) => {
    dispatch(planApproval(approvedPlanRequest))
  })
}

// approvedPlanRequest => 承認の変数,isApprovalがfalseからtrueに変化
export const planApproval = (approvedPlanRequest) => {
  return {
    type: PLAN_APPROVAL_EVENT,
    payload: approvedPlanRequest.data,
  }
}

// =================================================================================
// ログインユーザーのプランを購入してくれた人のリストから、messageRoomUserが契約してくれたプランがあるか確認
// =================================================================================

export const checkPurchasePlan = (clientYorozuId) => {
  return {
    type: CHECK_CLIENT_PURCHASE_PLAN_EVENT,
    payload: clientYorozuId,
  }
}
