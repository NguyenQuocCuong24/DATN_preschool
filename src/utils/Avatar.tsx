import React from "react";

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 60%)`;
};

const getInitials = (name: string) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

type AvatarProps = {
  name: string;
  size?: number;
};

const Avatar: React.FC<AvatarProps> = ({ name, size = 42 }) => {
  const initials = getInitials(name);
  const bgColor = stringToColor(name);

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold uppercase select-none"
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
