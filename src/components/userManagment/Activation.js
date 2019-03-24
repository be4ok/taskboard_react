import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {activateUser} from "../../actions/securityActions";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle";
import classnames from "classnames";

class Activation extends Component {

    constructor() {
        super();
        this.state = {
            activationCode: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: nextProps.errors,
        });
    }

    componentDidMount() {
        this.setState({
            activationCode: this.props.match.params.activationCode
        });

        this.props.activateUser(this.props.match.params.activationCode);
    }


    render() {

        const {errors} = this.state;

        const authenticationError = authenticationErrorHandle(errors);

        return (

            <div className="container">

                <div
                    className={classnames("card-header text-center ", {"alert-danger": authenticationError}, {"alert-info": !authenticationError})}>
                    {!authenticationError ? "Account successfully activated!" : authenticationError}
                </div>


            </div>

        );
    }
}

Activation.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {activateUser})(Activation);