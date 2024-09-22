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

const faqData = [
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
];

export default function FAQSection() {
    return (
        <Box component={'section'} id='faq' sx={{ margin: 'auto', padding: '50px' }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Respuestas Expertas a Sus Preguntas
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                Conózcanos Mejor
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
                {faqData.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            indicator={<ExpandMoreIcon color='secondary' sx={{fontSize: '20px'}}/>}
                        >
                            <Typography variant='subtitle2' fontWeight={'900'}>{item.question}</Typography>
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
}