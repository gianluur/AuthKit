import { Providers } from "@/types";
import type { RemotePattern } from 'next/dist/shared/lib/image-config'; 

const enabledProviders: Providers[keyof Providers][] = ['google', 'github'];

const providerRemotePatterns: Record<string, RemotePattern | RemotePattern[]> = {
  google: {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
    pathname: '/**',
    port: '', 
  },
  github: {
    protocol: 'https',
    hostname: 'avatars.githubusercontent.com',
    pathname: '/**',
    port: '', 
  },
  discord: {
    protocol: 'https',
    hostname: 'cdn.discordapp.com',
    pathname: '/avatars/**',
    port: '', 
  },
  facebook: {
    protocol: 'https',
    hostname: 'platform-lookaside.fbsbx.com',
    pathname: '/platform/profilepic/**',
    port: '', 
  },
  microsoft: {
    protocol: 'https',
    hostname: 'graph.microsoft.com',
    pathname: '/v1.0/me/photo/**',
    port: '', 
  },
  spotify: {
    protocol: 'https',
    hostname: 'i.scdn.co',
    pathname: '/image/**',
    port: '', 
  },
  twitch: [
    {
      protocol: 'https',
      hostname: 'static-cdn.jtvnw.net',
      pathname: '/**', 
      port: '', 
    },
    {
      protocol: 'https',
      hostname: 'static-cdn.jtvnw.net',
      pathname: '/**', 
      port: '', 
    },
  ],
  twitter: {
    protocol: 'https',
    hostname: 'pbs.twimg.com',
    pathname: '/**', 
    port: '', 
  },
  dropbox: {
    protocol: 'https',
    hostname: 'photos.dropboxstatic.com',
    pathname: '/**',
    port: '', 
  },
  linkedin: {
    protocol: 'https',
    hostname: 'media.licdn.com',
    pathname: '/**', 
    port: '', 
  },
  gitlab: {
    protocol: 'https',
    hostname: 'assets.gitlab-static.net',
    pathname: '/**', 
    port: '', 
  },
  tiktok: {
    protocol: 'https',
    hostname: 'p16-sign-va.tiktokcdn.com',
    pathname: '/**',
    port: '', 
  },
  reddit: [
    {
      protocol: 'https',
      hostname: 'styles.redditmedia.com',
      pathname: '/**', 
      port: '', 
    },
    {
      protocol: 'https',
      hostname: 'preview.redd.it',
      pathname: '/**',
      port: '', 
    },
  ],
  roblox: {
    protocol: 'https',
    hostname: 'tr.rbxcdn.com',
    pathname: '/**',
    port: '', 
  },
  vk: [
    {
      protocol: 'https',
      hostname: 'vk.com',
      pathname: '/**', 
      port: '', 
    },
    {
      protocol: 'https',
      hostname: 'sun*.vkuserphoto.ru',
      pathname: '/**',
      port: '', 
    },
  ],
  kick: {
    protocol: 'https',
    hostname: 'files.kick.com',
    pathname: '/**',
    port: '', 
  },
  zoom: {
    protocol: 'https',
    hostname: 'st1.zoom.us',
    pathname: '/**', 
    port: '', 
  },
  // Apple intentionally left out (Apple usually does not provide profile images)
};

export const remotePatterns: RemotePattern[] = enabledProviders.flatMap((provider) => {
  const entry = providerRemotePatterns[provider as keyof typeof providerRemotePatterns];

  if (entry) {
    return Array.isArray(entry) ? entry : [entry];
  }
  return [];
});
