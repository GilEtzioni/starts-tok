import { Image } from 'antd';
import germanyPNG from "../../images/germanIcon.png";
import usaPNG from "../../images/usaIcon.png";
import francePNG from "../../images/franceIcon.png";
import italyPNG from "../../images/italyIcon.png";
import spanishPNG from "../../images/spainIcon.png";
import { CourseLangauge } from '../../../../../api/common/types';

export const germanIcon = (
<Image width={20} preview={false} className="rounded-sm mr-5 mt-0.5" src={germanyPNG} />
);

export const usaIcon = (
  <Image width={20} preview={false} className="rounded-sm mr-5 mt-0.5" src={usaPNG} />
);

export const franceIcon = (
  <Image width={20} preview={false} className="rounded-sm mr-5 mt-0.5" src={francePNG} />
);

export const spanishIcon = (
  <Image width={20} preview={false} className="rounded-sm mr-5 mt-0.5" src={spanishPNG} />
);

export const italianIcon = (
  <Image width={20} preview={false} className="rounded-sm mr-5 mt-0.5" src={italyPNG} />
);

// Utility function to map language to icons
export const getLanguge = (language: CourseLangauge) => {
  switch (language) {
    case CourseLangauge.French:
      return franceIcon;
    case CourseLangauge.German:
      return germanIcon;
    case CourseLangauge.Italian:
      return italianIcon;
    case CourseLangauge.Spanish:
      return spanishIcon;
    case CourseLangauge.English:
      return usaIcon;
    default:
      return null;
  }
};