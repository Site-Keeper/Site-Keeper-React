import {
    ThemeProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from '@mui/material/styles';
import { extendTheme as joyExtendTheme } from '@mui/joy/styles';

const materialTheme = createTheme(
    {
        palette: {
            primary: {
                main: "rgb(24, 30, 75)",
            },
            secondary: {
                main: "rgb(107, 92, 255)",
            },
            success: {
                main: "rgb(90, 204, 164)",
            },
            warning: {
                main: "rgb(230, 202, 82)",
            },
            error: {
                main: "rgb(254, 101, 79)",
            },
            background: {
                paper: "rgb(249, 250, 252)",
                default: "rgb(255, 255, 255)",
            },
        },
        typography: {
            fontFamily: ["Poppins", "sans-serif"].join(","),
            h1: {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: 1.5,
            },
            h2: {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "42px",
                lineHeight: 1.5,
            },
            h3: {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: 1.5,
            },
            subtitle1: {
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: 1.5,
            },
            subtitle2: {
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.5,
            },
            body1: {
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1.5,
            },
            body2: {
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: 1.5,
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        borderWidth: "2px",
                        borderColor: "#302E49",
                        size: "small",
                        "& label.Mui-focused": {
                            color: "#302E49",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "#B2BAC2",
                        },
                        "& .MuiInputBase-formControl-root": {
                            borderColor: "#E0E3E7",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#E0E3E7",
                            },
                            "&:hover fieldset": {
                                borderColor: "#B2BAC2",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#302E49",
                            },
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        color: "#302E49",
                        "& fieldset": {
                            borderColor: "#E0E3E7",
                        },
                        "&:hover fieldset": {
                            borderColor: "#B2BAC2",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#302E49",
                        },
                    },
                },
            },
            MuiSnackbarContent: {
                styleOverrides: {
                    root: {
                        '&.notistack-MuiContent-success': {
                            backgroundColor: '#4caf50', // Color para el éxito
                        },
                        '&.notistack-MuiContent-error': {
                            backgroundColor: '#f49110', // Color para el error
                        },
                        '&.notistack-MuiContent-info': {
                            backgroundColor: '#2196f3', // Color para la información
                        },
                        '&.notistack-MuiContent-warning': {
                            backgroundColor: '#ff9800', // Color para la advertencia
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        color: "#302E49",
                        "& fieldset": {
                            borderColor: "#E0E3E7",
                        },
                        "&:hover fieldset": {
                            borderColor: "#B2BAC2",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#302E49",
                        },
                    }
                }
            }
        },
    }
);

const joyTheme = joyExtendTheme(
    {
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        500: "rgb(107, 92, 255)",
                        softBg: "rgb(107, 92, 255,1)",
                        softColor: "#",
                        softHoverBg: "rgb(107, 92, 255,0.6)",
                        50: "rgb(24, 30, 75)",
                    },
                    neutral: {
                        500: "rgb(255, 255, 255)"
                    },
                    success: {
                        500: "rgb(90, 204, 164)",
                    },
                    warning: {
                        500: "rgb(230, 202, 82)",
                    },
                    danger: {
                        500: "rgb(254, 101, 79)",
                    },
                    background: {
                        body: "rgb(255, 255, 255)",
                    }
                },
            },
        },
    }
);

type RiwiThemeProps = {
    children: React.ReactNode;
  };

export const RiwiTheme: React.FC<RiwiThemeProps> = ({ children }) => {
    return (
      <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <CssBaseline enableColorScheme />
          {children}
        </JoyCssVarsProvider>
      </ThemeProvider>
    );
  };


