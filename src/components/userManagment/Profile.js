import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {

        const {errors, user} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h4 className="display-4 text-center">Profile</h4>

                            <div className="form-group">

                                <div className="title-input">Login: {user.username}</div>
                                <div className="title-input">E-mail: {user.email}</div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps)(Profile);