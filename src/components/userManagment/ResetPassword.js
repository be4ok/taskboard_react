import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Loading from "../layout/Loading"
import classnames from "classnames";
import {login, cleanErrors, resetForgottenPassword} from "../../actions/securityActions";
import validationUtils from "../../utils/validationUtils";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
            isPasswordReset: false
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
        this.setState({[e.target.name]: e.target.value,});
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({errors: {}});

        await this.props.resetForgottenPassword(this.state.email);

        const {errors} = this.state;

        if (!errors.apierror) {
            this.setState({
                email: '',
                isPasswordReset: true
            })
        }
    }

    render() {

        const {errors} = this.state;
        const {isLoading} = this.props;

        const emailValidMessage = validationUtils(errors, 'email');

        return (
            <div className="container login-container">
                <div className="row pl-2 pr-2">
                    <div className="col-md-6 login-form m-auto">

                        <h2 className="text-center">Reset password</h2>
                        <p className="lead text-center">Please enter your email for reset your password</p>

                        {this.state.isPasswordReset &&
                        <div className="card-header text-center alert-success mb-4">
                            Please, check your e-mail to set new password.
                        </div>
                        }

                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">

                                <input
                                    autoFocus
                                    type="text"
                                    className={classnames("form-control form-control-lg", {"is-invalid": emailValidMessage.length})}
                                    placeholder="E-mail"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />

                                {emailValidMessage}

                            </div>

                            <div className="form-group mt-4 mb-4">

                                {isLoading ? <Loading/> :
                                    <input type="submit"
                                           value="Send"
                                           className="btn btn-lg btn-outline-success btnSubmit"
                                    />}

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
    resetForgottenPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {login, cleanErrors, resetForgottenPassword})(Login);