import React from 'react'
import LoginUi from './LoginUi';

export default async function LoginPage({searchParams}) {
  const {redirect} = await searchParams;

  return (
    <div>
      <LoginUi intendedUrl={redirect}/>
    </div>
  )
}
