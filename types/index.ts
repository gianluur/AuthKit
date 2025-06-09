export type Providers = {
  provider: "github" | "apple" | "discord" | "facebook" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom"
}

export type SocialButtonProps = {
  image: React.ReactNode,
  provider: Providers[keyof Providers],
  
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