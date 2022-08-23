import React from 'react'
import './spinnerStyle.css'
export default function Spinner() {
  return (
    <div className="login-form d-flex justify-content-center">
        <div className="spinner spinner-border text-primary" role="status"/>
    </div>
  )
}
