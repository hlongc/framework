import Header from './container'
import { connect } from 'react-redux'

const mapStateToProps = (state: any) => ({
  loginState: state.loginState
})

export default connect(mapStateToProps)(Header)