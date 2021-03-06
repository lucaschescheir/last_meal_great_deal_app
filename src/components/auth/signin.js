import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type}  />
        </div>
    );
}

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);

        this.props.signinUser({ email, password });
    }
//this is not working!!!
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oooopsss!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                <div >
                    <label>Email:</label>
                    <Field name="email"
                        type="email" component={renderInput} />
                </div>
                <div >
                    <label>Password:</label>
                    <Field name="password"
                        type="password" component={renderInput} />
                    {this.renderAlert()}

                </div>
                <button action="submit" >Sign in</button>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}

Signin = reduxForm({
 form: 'signin'
})(Signin);
export default connect(mapStateToProps, actions)(Signin);
