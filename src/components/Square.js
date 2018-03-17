import React from 'react'
import '../index.css'

export const Square = ({ value, onClick }) => (
  <div
    className="square"
    onClick={ onClick }
  >
    { value }
  </div>
)