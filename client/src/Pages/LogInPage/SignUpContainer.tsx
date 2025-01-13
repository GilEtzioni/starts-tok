import { SignUp } from '@clerk/clerk-react'

const SignUpContainer = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignUp path="/sign-up" />
        </div>
    )
}

export default SignUpContainer;