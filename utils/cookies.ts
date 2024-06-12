'use server'
import { cookies } from 'next/headers'

export default async function getCookie(name: string) {
    const cookieStore = cookies()
    const cookie = cookieStore.get(name)
    if (!cookie) return null;
    return cookie;
}