import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Loading from "../layout/Loading"
import classnames from "classnames";
import {login} from "../../actions/securityActions";
import validationUtils from "../../utils/validationUtils";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle"

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

    onSubmit(e) {
        e.preventDefault();

        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(loginRequest);
    }

    render() {

        const {errors} = this.state;

        const usernameValidMessage = validationUtils(errors, 'username');
        const passwordValidMessage = validationUtils(errors, 'password');
        const authenticationError = authenticationErrorHandle(errors);

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">

                                    <div>
                                        <input
                                            autoFocus
                                            type="text"
                                            className={classnames("form-control form-control-lg", {"is-invalid": usernameValidMessage.length || authenticationError})}
                                            placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    {usernameValidMessage}
                                    <p className="error-text">{authenticationError}</p>

                                </div>


                                <div className="form-group">

                                    <div>
                                        <input
                                            type="password"
                                            className={classnames("form-control form-control-lg", {"is-invalid": passwordValidMessage.length || authenticationError})}
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    {passwordValidMessage}
                                    <p className="error-text">{authenticationError}</p>

                                </div>

                                <input type="submit" value="Log-in" className="btn btn-info btn-block mt-4"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {login})(Login);