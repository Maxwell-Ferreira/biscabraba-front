interface MessageProps {
  text: string;
}

function Message({ text }: MessageProps) {
  return <span>{text}</span>;
}

export default Message;
