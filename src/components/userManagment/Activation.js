import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {activateUser} from "../../actions/securityActions";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle";
import Loading from "../layout/Loading";

class Activation extends Component {

    constructor() {
        super();
        this.state = {
            activationCode: '',
            errors: {}
        };
    }

    async componentDidMount() {
        this.setState({
            activationCode: this.props.match.params.activationCode
        });

        await this.props.activateUser(this.props.match.params.activationCode);

        this.setState({
            errors: this.props.errors,
        });
    }


    render() {

        const {errors} = this.state;
        const {isLoading} = this.props;

        const authenticationError = authenticationErrorHandle(errors);

        const success = <div className="card-header text-center alert-info">Account successfully activated!</div>;
        const authError = <div className="card-header text-center alert-danger">{authenticationError}</div>;

        let resultRender;

            if (!authenticationError) {
                resultRender = success
            } else {
                resultRender = authError
            }

        return (

            <div className="container">

                {isLoading ? <Loading/> : resultRender}

            </div>

        );
    }
}

Activation.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {activateUser})(Activation);