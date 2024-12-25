// A1
import PaletteIcon from '@mui/icons-material/Palette'; // 1
import LooksOneIcon from '@mui/icons-material/LooksOne'; // 2
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; // 3
import TodayIcon from '@mui/icons-material/Today'; // 4
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // 5
import WavingHandIcon from '@mui/icons-material/WavingHand'; // 6
import AcUnitIcon from '@mui/icons-material/AcUnit'; // 7
import CheckroomIcon from '@mui/icons-material/Checkroom'; // 8
import FastfoodIcon from '@mui/icons-material/Fastfood'; // 9
import HouseSidingIcon from '@mui/icons-material/HouseSiding'; // 10
import PetsIcon from '@mui/icons-material/Pets'; // 11
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'; // 12
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'; // 13
import SchoolIcon from '@mui/icons-material/School'; // 14
import WorkIcon from '@mui/icons-material/Work'; // 15
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'; // 16
import NordicWalkingIcon from '@mui/icons-material/NordicWalking'; // 17
import ChairIcon from '@mui/icons-material/Chair'; // 18
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'; // 19
import HexagonIcon from '@mui/icons-material/Hexagon'; // 20
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // 21
import CastleIcon from '@mui/icons-material/Castle'; // 22
import FestivalIcon from '@mui/icons-material/Festival'; // 23
import AttractionsIcon from '@mui/icons-material/Attractions'; // 24
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'; // 25

import "./Course.css";

interface CourseIconsProps {
  courseId: number;
}

const iconsCss = (): React.CSSProperties => {
  return {
    fontSize: '35px',
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
};


const CourseIcons: React.FC<CourseIconsProps> = ({ courseId }) => {
  const currIcon = (courseId: number) => {
    switch (courseId) {
      case 1:
        return <PaletteIcon style={iconsCss()} />;
      case 2:
        return <LooksOneIcon  style={iconsCss()} />;
      case 3:
        return <FamilyRestroomIcon  style={iconsCss()} />;
      case 4:
        return <TodayIcon  style={iconsCss()} />;
      case 5:
        return <CalendarTodayIcon  style={iconsCss()} />;
      case 6:
        return <WavingHandIcon  style={iconsCss()} />;
      case 7:
        return <AcUnitIcon  style={iconsCss()} />;
      case 8:
        return <CheckroomIcon  style={iconsCss()} />;
      case 9:
        return <FastfoodIcon  style={iconsCss()} />;
      case 10:
        return <HouseSidingIcon  style={iconsCss()} />;
      case 11:
        return <PetsIcon  style={iconsCss()} />;
      case 12:
        return <SentimentVerySatisfiedIcon  style={iconsCss()} />;
      case 13:
        return <DirectionsBusIcon  style={iconsCss()} />;
      case 14:
        return <SchoolIcon  style={iconsCss()} />;
      case 15:
        return <WorkIcon  style={iconsCss()} />;
      case 16:
        return <DirectionsWalkIcon  style={iconsCss()} />;
      case 17:
        return <NordicWalkingIcon  style={iconsCss()} />;
      case 18:
        return <ChairIcon  style={iconsCss()} />;
      case 19:
        return <SportsBasketballIcon  style={iconsCss()} />;
      case 20:
        return <HexagonIcon  style={iconsCss()} />;
      case 21:
        return <AccessTimeIcon  style={iconsCss()} />;
      case 22:
        return <CastleIcon  style={iconsCss()} />;
      case 23:
        return <FestivalIcon  style={iconsCss()} />;
      case 24:
        return <AttractionsIcon  style={iconsCss()} />;
      case 25:
        return <PhoneIphoneIcon  style={iconsCss()} />;
      default:
        return null;
    }
  }

  return (
    <div>
      {currIcon(courseId)}
    </div>
  );
}

export default CourseIcons;
