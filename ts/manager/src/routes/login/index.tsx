import { connect } from 'react-redux'
import Login from './container'
import { login, logout } from '@/store/loginState/actions'


const mapDispatchToProps = {
  login,
  logout
}

export default connect(null, mapDispatchToProps)(Login)