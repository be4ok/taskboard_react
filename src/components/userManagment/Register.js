import React, {Component} from "react";
import {createNewUser} from "../../actions/securityActions";
import PropTypes from "prop-types";
import Loading from "../layout/Loading";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
            errors: {},
            isAccountCreated: false
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
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            confirmPassword: this.state.confirmPassword
        };

        await this.props.createNewUser(newUser, this.props.history);

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
        const {isLoading} = this.props;

        const usernameValidMessage = validationUtils(errors, 'username');
        const passwordValidMessage = validationUtils(errors, 'password');
        const emailValidMessage = validationUtils(errors, 'email');
        const confirmPasswordValidMessage = validationUtils(errors, 'confirmPassword');

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>

                            {this.state.isAccountCreated &&
                                <div className="card-header text-center alert-success mb-4">
                                    Account has been created. Please, check your e-mail to activate your account.
                                </div>
                            }

                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">

                                    <div>
                                        <input
                                            autoFocus
                                            type="text"
                                            className={classnames("form-control form-control-lg", {"is-invalid": usernameValidMessage.length})}
                                            placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    {usernameValidMessage}

                                </div>

                                <div className="form-group">

                                    <div>
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {"is-invalid": emailValidMessage.length})}
                                            placeholder="E-mail"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    {emailValidMessage}

                                </div>

                                <div className="form-group">

                                    <div>
                                        <input
                                            type="password"
                                            className={classnames("form-control form-control-lg", {"is-invalid": passwordValidMessage.length})}
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    {passwordValidMessage}

                                </div>

                                <div className="form-group">

                                    <div>
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {"is-invalid": confirmPasswordValidMessage.length})}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                    />
                                    </div>

                                    {confirmPasswordValidMessage}

                                </div>

                                {isLoading ? <Loading/> : <input type="submit" value="Sign-up" className="btn btn-info btn-block mt-4"/>}

                            </form>
                        </div>
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
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
    isLoading: state.security.isLoading
});
export default connect(mapStateToProps, {createNewUser})(Register);