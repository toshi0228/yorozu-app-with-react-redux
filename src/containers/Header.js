import React from 'react'
// import PlanList from "../components/planList"
import { connect } from 'react-redux'
import { sigIn } from '../actions/'
import { Link } from 'react-router-dom'
import '../styles/Header.scss';


// componentDidMount(){
//     this.props.readEvents()
//     console.log("hi")
//   }

class Header extends React.Component {
    componentDidMount(){
        this.props.sigIn()
        console.log("propsの中身")
        console.log(this.props)
    }


    render(){
        // const {planList,changeScore} = this.props
        // const plans = planList.map(plan=>{
        //     return <li  
        //                 onClick={()=>{changeScore(plan.id)}}
        //                 className = "plan"
        //                 key={plan.id}
        //             >
        //             {plan.title}:  {plan.userName}:  {plan.sentence}
        //             </li>
        // })

        return (
            <div>
                {/* <h2 className="total-socre">プランリスト</h2> */}
                <div className='header-wrap'>
                    <h2 className='plan-list'>ヘッダー</h2>
                    <div className='rogin-btn'>
                    <Link to="/signin"><div onClick={(user)=>{sigIn(user)}}>ログイン </div></Link>
                        {/* <Link to="/events/signin">new Event</Link> */}
                    </div>
                </div>
                <hr className='header-borde-line'/>
            </div>
            )
    }
  }



const mapStateToProps = (state) => {
    return {
      planList: state.planData.planList,
    };
  };
  

const mapDispatchToProps = dispatch => {
  return {
    sigIn: () => dispatch(sigIn())
    // changeScore: (id) => dispatch(changeScore(id))
    // readEvents: () => dispatch(readEvents())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps )(Header);