import { TourProps } from "antd";
import { RefObject } from "react";

interface TourStepsProps {
  pointsRef?: RefObject<any>;
  languageRef?: RefObject<any>;
  contactRef?: RefObject<any>;
  dictionaryRef?: RefObject<any>;
  homeRef?: RefObject<any>;
  cardRef?: RefObject<any>;
  gameRef?: RefObject<any>;
  graphRef?: RefObject<any>;
  tableRef?: RefObject<any>;
}

export const getTourSteps = (refs: TourStepsProps): TourProps["steps"] => {
  if (Object.values(refs).some((ref) => ref === undefined)) {
    return [];
  }

  return [
    {
      title: "ניקוד",
      description: "הניקוד מציג את הניקוד הכולל שלכם",
      target: () => refs.pointsRef?.current,
    },
    {
      title: "שפה",
      description: "בלחציה על המשתמש תוכלו להחליף שפה ושם משתמש",
      target: () => refs.languageRef?.current,
    },
    {
      title: "צור קשר",
      description: "",
      target: () => refs.contactRef?.current,
    },
    {
      title: "מילון",
      description: "",
      target: () => refs.dictionaryRef?.current,
    },
    {
      title: "דף הבית",
      description: "",
      target: () => refs.homeRef?.current,
    },
    {
      title: "קורסים",
      description: "בכל קורס ישנם 25 שיעורים לפי נושאים .(A1-C2) ישנם 6 קורסים המחולקים לפי רמות",
      target: () => refs.cardRef?.current,
    },
    {
      title: "תרגול",
      description: "התרגול יעזור לכם ללמוד ולתרגל מילים נוספות",
      target: () => refs.gameRef?.current,
    },
    {
      title: "גרף שבועי",
      description: "הגרף מצגי את הניקוד השבועי שלכם",
      target: () => refs.graphRef?.current,
    },
    {
      title: "המובילים השבוע",
      description: "האבלה מציגה את השחקנים מובילים השבוע",
      target: () => refs.tableRef?.current,
    },
  ];
};