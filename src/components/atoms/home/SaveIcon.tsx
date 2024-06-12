import { FC } from "react";

interface SaveIconProps {
    isActive: boolean;
}

export const SaveIcon: FC<SaveIconProps> = ({ isActive }) => (
    <svg width="12" height="18" viewBox="0 0 12 18" fill={isActive ? '#8043F9' : 'none'} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.5L6 13.75L0 17.5V1C0 0.801088 0.0790178 0.610322 0.21967 0.46967C0.360322 0.329018 0.551088 0.25 0.75 0.25H11.25C11.4489 0.25 11.6397 0.329018 11.7803 0.46967C11.921 0.610322 12 0.801088 12 1V17.5Z" stroke={isActive ? '#8043F9' : '#fff'} />
    </svg>
)