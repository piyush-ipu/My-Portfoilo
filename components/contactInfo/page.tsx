import React from 'react'
import MailForm from './Info/mailform'
import Info from './Info/info'


const ContactInfo = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row items-center lg:items-start justify-between gap-10 z-10">
         <Info />
        <MailForm />
    </div>
  )
}

export default ContactInfo
