import {
    Typography,
    Box,
} from '@mui/material';
import Accordion from '@mui/joy/Accordion';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQItem {
    question: string;
    answer: string;
}

interface Translations {
    title: string;
    subtitle: string;
    faqData: FAQItem[];
    changeLanguage: string;
}

interface LanguageTranslations {
    en: Translations;
    es: Translations;
}

const translations: LanguageTranslations = {
    en: {
        title: "Expert Answers to Your Questions",
        subtitle: "Get to Know Us Better",
        faqData: [
            {
                question: "What makes your space management services stand out?",
                answer: "Our space management services stand out due to their innovative approach and personalized solutions for each client."
            },
            {
                question: "How efficient is your lost and found service?",
                answer: "Our lost and found service uses advanced tracking systems to quickly locate misplaced items within managed spaces, ensuring a high success rate and rapid recovery."
            },
            {
                question: "What tools are included in your management solutions?",
                answer: "Our management solutions offer companies comprehensive tools for effective oversight of their spaces and employees, including user-friendly interfaces and customizable features tailored to each business's needs."
            },
            {
                question: "How do you ensure optimal organization in physical spaces?",
                answer: "We excel in efficiently managing and organizing physical spaces for businesses by implementing strategic layouts, innovative storage solutions, and meticulous attention to detail."
            },
            {
                question: "Are your management solutions suitable for businesses of all sizes?",
                answer: "Yes, our management solutions are scalable and adaptable, catering to businesses of all sizes, from startups to large enterprises, ensuring efficient organization and seamless operations."
            },
            {
                question: "What sets your company apart from competitors in space management?",
                answer: "Our commitment to delivering exceptional service, innovative strategies, and a client-centric approach distinguishes us from competitors, ensuring that your space management needs are met with precision and professionalism."
            }
        ],
        changeLanguage: "Cambiar a Español"
    },
    es: {
        title: "Respuestas Expertas a Sus Preguntas",
        subtitle: "Conózcanos Mejor",
        faqData: [
            {
                question: "¿Qué hace que sus servicios de gestión de espacios destaquen?",
                answer: "Nuestros servicios de gestión de espacios se destacan por su enfoque innovador y personalizado para cada cliente."
            },
            {
                question: "¿Qué tan eficiente es su servicio de objetos perdidos?",
                answer: "Nuestro servicio de objetos perdidos utiliza sistemas de seguimiento avanzados para localizar rápidamente los artículos extraviados dentro de los espacios gestionados, asegurando una alta tasa de éxito y una recuperación rápida."
            },
            {
                question: "¿Qué herramientas se incluyen en sus soluciones de gestión?",
                answer: "Nuestras soluciones de gestión ofrecen a las empresas herramientas integrales para la supervisión efectiva de sus espacios y empleados, incluyendo interfaces fáciles de usar y características personalizables adaptadas a las necesidades de cada negocio."
            },
            {
                question: "¿Cómo aseguran una organización óptima en espacios físicos?",
                answer: "Nos destacamos en la gestión y organización eficiente de espacios físicos para empresas mediante la implementación de diseños estratégicos, soluciones de almacenamiento innovadoras y una atención meticulosa a los detalles."
            },
            {
                question: "¿Sus soluciones de gestión son adecuadas para empresas de todos los tamaños?",
                answer: "Sí, nuestras soluciones de gestión son escalables y adaptables, atendiendo a empresas de todos los tamaños, desde startups hasta grandes empresas, asegurando una organización eficiente y operaciones sin problemas."
            },
            {
                question: "¿Qué distingue a su empresa de los competidores en la gestión de espacios?",
                answer: "Nuestro compromiso de ofrecer un servicio excepcional, estrategias innovadoras y un enfoque centrado en el cliente nos distingue de los competidores, asegurando que sus necesidades de gestión de espacios se satisfagan con precisión y profesionalismo."
            }
        ],
        changeLanguage: "Change to English"
    }
};

type Language = 'en' | 'es';

interface IProp {
    language: Language;
}

const FAQSection: React.FC<IProp> = ({ language }) => {
    const t = translations[language];

    return (
        <Box component={'section'} width={'70%'} id='faq' sx={{ margin: 'auto', padding: '50px', position: 'relative' }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                {t.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                {t.subtitle}
            </Typography>
            <AccordionGroup
                variant="outlined"
                transition="0.2s"
                sx={(theme) => ({
                    borderRadius: 'lg',
                    [`& .${accordionSummaryClasses.button}:hover`]: {
                        bgcolor: 'transparent',
                    },
                    [`& .${accordionDetailsClasses.content}`]: {
                        boxShadow: `inset 0 1px ${theme.vars.palette.divider}`,
                        [`&.${accordionDetailsClasses.expanded}`]: {
                            paddingBlock: '0.75rem',
                        },
                    },
                })}
            >
                {t.faqData.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            indicator={<ExpandMoreIcon color='secondary' sx={{ fontSize: '20px' }} />}
                        >
                            <Typography variant='subtitle2' fontWeight={'900'}>
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body1'>
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionGroup>
        </Box>
    );
};

export default FAQSection;
