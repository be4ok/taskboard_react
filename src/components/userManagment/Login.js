import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {login, cleanErrors} from "../../actions/securityActions";
import {validationUtils} from "../../utils/validationUtils";
import {authorizationErrorHandle} from "../../securityUtils/authorizationErrorHandle"
import {Link} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isRememberMe: false,
            isSending: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/board")
        }

        this.props.cleanErrors();
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
        this.setState({
            [e.target.name]: e.target.value,
            isRememberMe: e.target.checked
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({
            errors: {},
            isSending: true
        });

        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        await this.props.login(loginRequest, this.state.isRememberMe);

        this.setState({isSending: false});

        if (authorizationErrorHandle(this.state.errors)) {
            this.setState({password: ""})
        }
    }

    render() {

        const {errors} = this.state;

        const usernameValidMessage = validationUtils(errors, 'username');
        const passwordValidMessage = validationUtils(errors, 'password');
        const authenticationError = authorizationErrorHandle(errors);

        return (
            <div className="container login-container">
                <div className="row pl-2 pr-2">
                    <div className="col-md-6 login-form m-auto bg-white">

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
                                    disabled={this.state.isSending}
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
                                    disabled={this.state.isSending}
                                />

                                {passwordValidMessage}
                                <p className="error-text">{authenticationError}</p>

                            </div>


                            <div className="form-group mt-4 mb-4">


                                    <input type="submit"
                                           value={!this.state.isSending ? "Log-in" : "Logging..."}
                                           className="btn btn-lg btn-outline-success btnSubmit m-auto"
                                           disabled={this.state.isSending}
                                    />

                            </div>


                            <div className="form-group d-flex justify-content-between">

                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value={this.state.isRememberMe}
                                        name="isRememberMe"
                                        id="customControlInline"
                                        onChange={this.onChange}
                                    />
                                        <label className="custom-control-label text-primary text-center" htmlFor="customControlInline">Remember me</label>
                                </div>

                                <Link to="/resetpwd" className="forgetPwd text-center">Forget password?</Link>

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
    cleanErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
});

export default connect(mapStateToProps, {login, cleanErrors})(Login);