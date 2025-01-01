// A1
import PaletteIcon from '@mui/icons-material/Palette';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PetsIcon from '@mui/icons-material/Pets';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import ChairIcon from '@mui/icons-material/Chair';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import HexagonIcon from '@mui/icons-material/Hexagon';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CastleIcon from '@mui/icons-material/Castle';
import FestivalIcon from '@mui/icons-material/Festival';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

interface CourseIconsProps {
  courseId: number;
}

const iconsCss = 'text-[35px] absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2';

const iconMap: { [key: number]: React.ReactNode } = {
  1: <PaletteIcon className={iconsCss} />,
  2: <FamilyRestroomIcon className={iconsCss} />,
  3: <FamilyRestroomIcon className={iconsCss} />,
  4: <TodayIcon className={iconsCss} />,
  5: <CalendarTodayIcon className={iconsCss} />,
  6: <WavingHandIcon className={iconsCss} />,
  7: <AcUnitIcon className={iconsCss} />,
  8: <CheckroomIcon className={iconsCss} />,
  9: <FastfoodIcon className={iconsCss} />,
  10: <HouseSidingIcon className={iconsCss} />,
  11: <PetsIcon className={iconsCss} />,
  12: <SentimentVerySatisfiedIcon className={iconsCss} />,
  13: <DirectionsBusIcon className={iconsCss} />,
  14: <SchoolIcon className={iconsCss} />,
  15: <WorkIcon className={iconsCss} />,
  16: <DirectionsWalkIcon className={iconsCss} />,
  17: <NordicWalkingIcon className={iconsCss} />,
  18: <ChairIcon className={iconsCss} />,
  19: <SportsBasketballIcon className={iconsCss} />,
  20: <HexagonIcon className={iconsCss} />,
  21: <AccessTimeIcon className={iconsCss} />,
  22: <CastleIcon className={iconsCss} />,
  23: <FestivalIcon className={iconsCss} />,
  24: <AttractionsIcon className={iconsCss} />,
  25: <PhoneIphoneIcon className={iconsCss} />,
};

const CourseIcons: React.FC<CourseIconsProps> = ({ courseId }) => {
  return <div>{iconMap[courseId] || null}</div>;
};

export default CourseIcons;
