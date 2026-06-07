import { TRANSLATIONS } from "../../constants/translations";
import AboutFloatSection from "./AboutFloatSection";
import AboutBubblesSection from "./AboutBubblesSection";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const AboutSection = ({ content }: Props) => (
    <>
        <AboutFloatSection content={content} />
        <AboutBubblesSection content={content} />
    </>
);

export default AboutSection;
