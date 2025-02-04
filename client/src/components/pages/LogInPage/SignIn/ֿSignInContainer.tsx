import { SignIn } from '@clerk/clerk-react'

const SignInContainer = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignIn path="/sign-in" />
        </div>
    )
}

export default SignInContainer;