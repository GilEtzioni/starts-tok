import { Table, TableProps, Typography, Row, Image } from 'antd';

// png
import germanyPNG from "../../images/germanIcon.png";
import usaPNG from "../../images/usaIcon.png";
import francePNG from "../../images/franceIcon.png";
import italyPNG from "../../images/italyIcon.png";
import spanishPNG from "../../images/spainIcon.png";

const useUsersTableImages = () => {
  const germanIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={germanyPNG}
    />
  );

  const usaIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={usaPNG}
    />
  );

  const franceIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={francePNG}
    />
  );

  const spanishIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={spanishPNG}
    />
  );

  const italianIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={italyPNG}
    />
  );

  return {
    germanIcon,
    usaIcon,
    franceIcon,
    spanishIcon,
    italianIcon,
  };
};

export default useUsersTableImages;