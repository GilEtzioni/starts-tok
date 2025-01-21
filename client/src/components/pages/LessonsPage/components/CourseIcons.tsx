// A1
import PaletteIcon from '@mui/icons-material/Palette';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ChairIcon from '@mui/icons-material/Chair';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import HexagonIcon from '@mui/icons-material/Hexagon';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CourseIconsProps {
  courseId: number;
}

const iconsCss = 'text-[35px] absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2';

const iconMap: { [key: number]: React.ReactNode } = {
  1: <PaletteIcon className={iconsCss} />,
  2: <LooksOneIcon className={iconsCss} />,
  3: <FamilyRestroomIcon className={iconsCss} />,
  4: <TodayIcon className={iconsCss} />,
  5: <CalendarTodayIcon className={iconsCss} />,
  6: <WavingHandIcon className={iconsCss} />,
  7: <AcUnitIcon className={iconsCss} />,
  8: <CheckroomIcon className={iconsCss} />,
  9: <FastfoodIcon className={iconsCss} />,
  10: <SportsBarIcon className={iconsCss} />,
  11: <HouseSidingIcon className={iconsCss} />,
  12: <PetsIcon className={iconsCss} />,
  13: <EmojiEmotionsIcon className={iconsCss} />,
  14: <DirectionsBusIcon className={iconsCss} />,
  15: <SquareFootIcon className={iconsCss} />,
  16: <WorkIcon className={iconsCss} />,
  17: <AccessibilityIcon className={iconsCss} />,
  18: <SportsBasketballIcon className={iconsCss} />,
  19: <ChairIcon className={iconsCss} />,
  20: <DirectionsRunIcon className={iconsCss} />,
  21: <HexagonIcon className={iconsCss} />,
  22: <AccessTimeIcon className={iconsCss} />,
  23: <DirectionsWalkIcon className={iconsCss} />,
  24: <ShoppingCartIcon className={iconsCss} />,
  25: <PhoneIphoneIcon className={iconsCss} />,
};

const CourseIcons: React.FC<CourseIconsProps> = ({ courseId }) => {
  
  return <div>{iconMap[courseId] || <div className={iconsCss}>?</div>}</div>;
};

export default CourseIcons;
