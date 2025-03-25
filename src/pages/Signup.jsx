import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  console.log("✅ Signup component loaded");  // ✅ Add this for confirmation

  return (
    <div className='py-8'>
      <SignupComponent />
    </div>
  )
}

export default Signup
