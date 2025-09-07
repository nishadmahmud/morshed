import React from 'react'
import InvoiceUi from './InvoiceUi'

export default function PaymentSuccessPage({searchParams}) {
  const {pay_mode} = searchParams;
  return (
    <div>
      <InvoiceUi payMode={pay_mode}/>
    </div>
  )
}
