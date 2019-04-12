import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../../utils/validationUtils";
import {updateUserEmail} from "../../../actions/profileActions";

class ChangeUserEmail extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            email: {
                newEmail: ''
            },
            isEmailSuccessfullyChanged: false,
            isSaving: false,
            errors: {}
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onEmailChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        let email = {...this.state.email};
        email[name] = value;
        this.setState({email});
    }

    async onEmailSubmit(e) {
        e.preventDefault();

        this.setState({
            isEmailSuccessfullyChanged: false,
            isSaving: true
        });

        const {email} = this.state;
        await this.props.updateUserEmail(email);

        this.setState({isSaving: false});

        const {errors} = this.state;
        if (!errors.apierror) {
            this.setState({
                isEmailSuccessfullyChanged: true,
                email: {
                    newEmail: ''
                }
            })
        }
    }

    render() {

        const {errors, email, isSaving} = this.state;

        const emailValidMessage = validationUtils(errors, 'newEmail');

        return (

            <form onSubmit={this.onEmailSubmit}>

                <div className="form-group mb-3">

                    <span>Change your e-mail:</span>

                    <input
                        type="text"
                        className={classnames("form-control form-control-sm w-50", {"is-invalid": emailValidMessage.length})}
                        placeholder="E-mail"
                        name="newEmail"
                        value={email.newEmail}
                        onChange={this.onEmailChange}
                        disabled={this.state.isSaving}
                    />

                    {emailValidMessage}
                    {this.state.isEmailSuccessfullyChanged &&
                    <span className="text-success">Email has been successfully changed</span>}

                </div>

                <input
                    type="submit"
                    value={!isSaving ? "Save" : "Saving..."}
                    className="btn btn-sm w-50 btn-outline-success"
                    disabled={isSaving}
                />

                <hr/>

            </form>
        );
    }
}

ChangeUserEmail.propTypes = {
    updateUserEmail: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {updateUserEmail})(ChangeUserEmail);