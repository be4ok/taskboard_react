import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Loading from "../layout/Loading"
import classnames from "classnames";
import {login} from "../../actions/securityActions";
import validationUtils from "../../utils/validationUtils";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle"
import {Link} from "react-router-dom";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/board")
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }

        if (nextProps.security.validToken) {
            this.props.history.push("/board")
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async onSubmit(e) {
        e.preventDefault();

        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        await this.props.login(loginRequest);

        if (authenticationErrorHandle(this.state.errors)) {
            this.setState({password: ""})
        }
    }

    render() {

        const {errors} = this.state;
        const {isLoading} = this.props;

        const usernameValidMessage = validationUtils(errors, 'username');
        const passwordValidMessage = validationUtils(errors, 'password');
        const authenticationError = authenticationErrorHandle(errors);

        return (
            <div className="container login-container">
                <div className="row pl-2 pr-2">
                    <div className="col-md-6 login-form m-auto">

                        <h2 className="text-center">Log In</h2>
                        <p className="lead text-center">Please enter your email and password</p>

                        <form onSubmit={this.onSubmit}>


                            <div className="form-group">

                                <input
                                    autoFocus
                                    type="text"
                                    className={classnames("form-control form-control-lg", {"is-invalid": usernameValidMessage.length || authenticationError})}
                                    placeholder="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />

                                {usernameValidMessage}
                                <p className="error-text">{authenticationError}</p>

                            </div>


                            <div className="form-group">

                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {"is-invalid": passwordValidMessage.length || authenticationError})}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />

                                {passwordValidMessage}
                                <p className="error-text">{authenticationError}</p>

                            </div>


                            <div className="form-group mt-4 mb-4">

                                {isLoading ? <Loading/> :
                                    <input type="submit"
                                           value="Log-in"
                                           className="btn btn-lg btn-outline-success btnSubmit"
                                    />}

                            </div>


                            <div className="form-group d-flex justify-content-between">

                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customControlInline"
                                    />
                                        <label className="custom-control-label text-primary text-center" htmlFor="customControlInline">Remember me</label>
                                </div>

                                <Link to="#" className="forgetPwd text-center">Forget password?</Link>

                            </div>


                            <div className="form-group d-flex mt-5">
                                <Link to="/register" className="forgetPwd m-auto">Sign-up</Link>
                            </div>

                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {login})(Login);