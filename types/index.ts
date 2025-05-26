export type SocialButtonProps = {
  image: React.ReactNode,
  provider: string,
  
  color?: string,
  background: string
};

export type PasswordStrengthProps = {
  strength: number;
}

export type FormStatusProps = {
  message?: string
  isError?: boolean
};