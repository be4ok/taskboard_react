import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {updateUserEmail} from "../../actions/securityActions";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            newEmail: '',
            errors: {}
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.user.username !== this.props.match.params.username) {
            this.props.history.push("/")
        }

        this.setState({user: this.props.security.user})
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onEmailChange(e) {
        this.setState({newEmail: e.target.value})
    }

    onEmailSubmit(e) {
        e.preventDefault();
        const newEmail = this.state.newEmail;
        this.props.updateUserEmail(newEmail);
    }

    render() {

        const {errors, user} = this.state;

        const emailValidMessage = validationUtils(errors, 'newEmail');

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h4 className="display-4 text-center">Profile</h4>

                            <div className="form-group">

                                <div className="title-input">Login: {user.username}</div>
                                <div className="title-input">E-mail: {user.email}</div>

                                <form onSubmit={this.onEmailSubmit}>

                                    <div className="form-group">

                                        <div className="title-input">Set new E-mail:</div>

                                        <div>
                                            <input
                                                type="newEmail"
                                                className={classnames("form-control form-control-lg", {"is-invalid": emailValidMessage.length})}
                                                placeholder="E-mail"
                                                name="newEmail"
                                                value={this.state.email}
                                                onChange={this.onEmailChange}
                                            />
                                        </div>

                                        {emailValidMessage}

                                    </div>

                                    <input type="submit" value="Send" className="btn btn-info btn-block mt-4"/>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    updateUserEmail: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {updateUserEmail})(Profile);