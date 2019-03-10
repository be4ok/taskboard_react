import React, {Component} from "react";
import {createNewUser} from "../../actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../validationUtils";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            validation: {}
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
        if (nextProps.validation) {
            this.setState({validation: nextProps.validation});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.createNewUser(newUser, this.props.history);
    }


    render() {

        const {validation} = this.state;

        const usernameValidMessage = validationUtils(validation, 'username');
        const passwordValidMessage = validationUtils(validation, 'password');
        const confirmPasswordValidMessage = validationUtils(validation, 'confirmPassword');

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>

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
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
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
    validation: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    validation: state.validation,
    security: state.security
});
export default connect(mapStateToProps, {createNewUser})(Register);