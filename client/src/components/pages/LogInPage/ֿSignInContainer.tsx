import { SignIn } from '@clerk/clerk-react'
import { useEffect } from 'react'

const SignInContainer = () => {

    useEffect(() => {
        console.log("SignInContainer")
      })

    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignIn path="/sign-in" />
        </div>
    )
}

export default SignInContainer;