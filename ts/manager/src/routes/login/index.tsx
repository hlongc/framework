import { connect } from 'react-redux'
import Login from './container'
import { login } from '../../store/user/actions'

const mapStateToProps = (state: any) => ({
  loginStatus: state.user.loginStatus
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)