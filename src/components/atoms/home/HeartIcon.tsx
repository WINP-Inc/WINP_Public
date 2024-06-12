import { FC } from "react";

interface HeartIconProps {
  isActive: boolean;
}

export const HeartIcon: FC<HeartIconProps> = ({ isActive }) => (
  <svg width="22" height="19" viewBox="0 0 22 19" fill={isActive ? '#8043F9' : 'none'} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 17.75C11 17.75 1.25 12.5 1.25 6.3125C1.25 4.96984 1.78337 3.68217 2.73277 2.73277C3.68217 1.78337 4.96984 1.25 6.3125 1.25C8.43031 1.25 10.2444 2.40406 11 4.25C11.7556 2.40406 13.5697 1.25 15.6875 1.25C17.0302 1.25 18.3178 1.78337 19.2672 2.73277C20.2166 3.68217 20.75 4.96984 20.75 6.3125C20.75 12.5 11 17.75 11 17.75Z" stroke={isActive ? '#8043F9' : 'white'} />
  </svg>
); 