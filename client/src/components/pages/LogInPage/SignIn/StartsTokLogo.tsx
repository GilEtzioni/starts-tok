import { Typography } from "antd";

const { Title } = Typography

export const StartsTokLogo = () => {
  return (
    <Title className="text-3xl font-extrabold">
        <span className="bg-gradient-to-r from-[hsl(142.1,76.2%,36.3%)] to-[hsl(142.1,70.6%,45.3%)] bg-clip-text text-transparent">
        Starts
        </span>
        <span className="text-black">Tok</span>
    </Title>
  );
};

export default StartsTokLogo;