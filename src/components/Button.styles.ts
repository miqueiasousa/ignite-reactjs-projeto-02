import s from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants: { [K in ButtonVariant]: string } = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = s.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  background-color: ${props => buttonVariants[props.variant]}
`
