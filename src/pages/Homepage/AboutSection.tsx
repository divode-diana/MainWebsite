import { TRANSLATIONS } from "../../constants/translations";
import { useLanguage } from "../../context/LanguageContext";
import AboutFloatSection from "./AboutFloatSection";
import AboutBubblesSection from "./AboutBubblesSection";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const AboutSection = ({ content }: Props) => {
    const { language } = useLanguage();
    return (
        <>
            <AboutFloatSection content={content} />
            <AboutBubblesSection key={language} content={content} />
        </>
    );
};

export default AboutSection;
