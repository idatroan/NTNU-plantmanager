import ResetPassword from "../components/forgotten-password/ResetPassword"

const ResetPasswordScreen = (props) => {

    return (
        <div>
            <h1>Password Reset</h1>
            <div className="component-container">
                <ResetPassword { ...props } />
            </div>
        </div>
    )

}

export default ResetPasswordScreen;