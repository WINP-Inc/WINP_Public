import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react'

interface RedirectLinkProps {
  href: string;
  children: React.ReactNode;
  isReplace?: boolean;
}

export const RedirectLink: FC<RedirectLinkProps> = ({ href, children, isReplace = false }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <Link href={href} onClick={handleClick} replace={isReplace}>
      { children }
    </Link>
  )
}

interface RedirectMode {
  href: string;
  isReplace?: boolean;
  isPrefetch?: boolean;
}

export const useRedirectPage = ({ href, isReplace, isPrefetch = true }: RedirectMode) => {
  const router = useRouter();

  useEffect(() => {
    if (isPrefetch) {
      router.prefetch(href);
    }
  }, [href, isPrefetch, router])

  const redirectPage = (): void => {
    isReplace ? router.replace(href) : router.push(href)
  }

  return { redirectPage }
}
