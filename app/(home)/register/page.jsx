import React from 'react'
import RegisterUi from './RegisterUi';

export default function RegisterPage({searchParams}) {
  const {redirect} = searchParams;

  return (
    <div>
      <RegisterUi intendedUrl={redirect}/>
    </div>
  )
}
