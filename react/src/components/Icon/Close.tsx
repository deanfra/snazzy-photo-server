import React from 'react'

type Props = {
  color: string
}

const CloseIcon = ({ color }: Props): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke={color}
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

export default CloseIcon
