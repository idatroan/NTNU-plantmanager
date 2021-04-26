import React, { Component } from 'react';
import axios from 'axios';
import TextInput from "../text-input/TextInput";
import Button from "../button/Button";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailSent: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(' /forgot', {
                email: this.state.email
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    emailSent: true
                })
            })
    };

    render() {
        const { email, emailSent } = this.state;

        return (
            <div>
                {emailSent ? <span>E-mail with reset instructions on it's way!</span>
                :
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Please enter your email:</label>
                    <TextInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        required />
                    <Button type="submit" value="Send" variant="btn--primary--solid" size="btn--medium"/>
                </form>
                }
            </div>
        )
    }
}

export default ForgotPassword;