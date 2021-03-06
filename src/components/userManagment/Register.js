import React, {Component} from "react";
import {createNewUser, cleanErrors} from "../../actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {validationUtils} from "../../utils/validationUtils";
import {Link} from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
            errors: {},
            isAccountCreated: false,
            isSending: false
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
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({isSending: true});

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            confirmPassword: this.state.confirmPassword
        };

        await this.props.createNewUser(newUser, this.props.history);

        this.setState({isSending: false});

        const {errors} = this.state;

        if (!errors.apierror) {
            this.setState({
                isAccountCreated: true,
                username: '',
                password: '',
                email: '',
                confirmPassword: ''
            })
        }


    }


    render() {

        const {errors} = this.state;

        const usernameValidMessage = validationUtils(errors, 'username');
        const passwordValidMessage = validationUtils(errors, 'password');
        const emailValidMessage = validationUtils(errors, 'email');
        const confirmPasswordValidMessage = validationUtils(errors, 'confirmPassword');

        return (
            <div className="container login-container">
                <div className="row pl-2 pr-2">
                    <div className="col-md-6 login-form m-auto bg-white">

                        <h2 className="text-center">Sign Up</h2>
                        <p className="lead text-center">Create your account</p>

                        {this.state.isAccountCreated &&
                        <div className="card-header text-center alert-success mb-4">
                            Account has been created. <br/>
                            Please, check your e-mail to activate your account.
                        </div>
                        }

                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">

                                <input
                                    autoFocus
                                    type="text"
                                    className={classnames("form-control form-control-lg", {"is-invalid": usernameValidMessage.length})}
                                    placeholder="Username*"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    disabled={this.state.isSending}
                                />

                                {usernameValidMessage}

                            </div>


                            <div className="form-group">

                                <input
                                    type="text"
                                    className={classnames("form-control form-control-lg", {"is-invalid": emailValidMessage.length})}
                                    placeholder="E-mail*"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    disabled={this.state.isSending}
                                />

                                {emailValidMessage}

                            </div>


                            <div className="form-group">

                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {"is-invalid": passwordValidMessage.length})}
                                    placeholder="Password*"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    disabled={this.state.isSending}
                                />

                                {passwordValidMessage}

                            </div>


                            <div className="form-group">

                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {"is-invalid": confirmPasswordValidMessage.length})}
                                    placeholder="Confirm Password*"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                    disabled={this.state.isSending}
                                />

                                {confirmPasswordValidMessage}

                            </div>


                            <div className="form-group mt-4 mb-4">

                                    <input type="submit"
                                           value={!this.state.isSending ? "Sign-up" : "Signing in..."}
                                           className="btn btn-lg btn-outline-success btnSubmit m-auto"
                                           disabled={this.state.isSending}
                                    />

                            </div>


                            <div className="form-group d-flex mt-5">
                                <Link to="/login" className="forgetPwd m-auto">Log-in</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
});
export default connect(mapStateToProps, {createNewUser, cleanErrors})(Register);