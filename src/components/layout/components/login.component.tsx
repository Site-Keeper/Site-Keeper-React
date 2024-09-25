import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  InputLabel,
  IconButton,
  OutlinedInput,
  FormControl,
  Link,
  Box,
  FormHelperText,
  Modal
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logoRiwi from "../../../assets/img/logoRiwi.png";
import { LoginSubmit } from "../hooks/use-login-submit";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type FormValues = {
  documentNumber: string;
  password: string;
};

const schema = yup.object().shape({
  documentNumber: yup
    .string()
    .matches(/^\d+$/, "Debe ser un número válido")
    .required("Número de documento requerido"),
  password: yup.string().required("Contraseña requerida"),
});

interface LoginProps {
  handleCloseModal: () => void;
  showLoginModal: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px"
};

export const LoginModal = ({ handleCloseModal, showLoginModal }: LoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    handleSubmit,
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
    criteriaMode: "firstError",
    mode: "onSubmit",
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async ({ documentNumber, password }: FormValues) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      await LoginSubmit({
        doc_number: String(documentNumber),
        password,
        dispatch,
        handleCloseModal,
        navigate
      });
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(error);
      if (axiosError.response?.status === 404) {
        setLoginError("Credenciales incorrectas. Verifique su número de documento o contraseña.");
      } else {
        setLoginError("Ha ocurrido un error. Intente nuevamente.");
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleValidateAndSubmit = async () => {
    try {
      clearErrors("password");
      const isDocumentValid = await trigger("documentNumber");
      if (!isDocumentValid) {
        const error = await schema.validateAt("documentNumber", { documentNumber: "documentNumber" });
        throw error;
      }
      clearErrors("documentNumber");

      const isPasswordValid = await trigger("password");
      if (!isPasswordValid) {
        const error = await schema.validateAt("password", {
          password: "password",
        });
        throw error;
      }
      clearErrors("password");
      handleSubmit(onSubmit)();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={showLoginModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img src={logoRiwi} style={{ maxHeight: "200px" }} alt="Riwi logo" />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack
            spacing={3}
            sx={{ width: "100%", height: "100%", alignItems: "center" }}
          >
            <Controller
              name="documentNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  size="medium"
                  required
                  label="Número de Documento"
                  color="secondary"
                  fullWidth
                  {...field}
                  error={!!errors?.documentNumber || !!loginError}
                  helperText={errors?.documentNumber?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  fullWidth
                  required
                  size="medium"
                  variant="outlined"
                  {...field}
                  error={!!errors?.password || !!loginError} // Si hay error o mensaje de loginError
                >
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                    // Aquí se añade la detección de la tecla Enter
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleValidateAndSubmit(); // Llamada al método de validación y envío
                      }
                    }}
                  />
                  {errors?.password && (
                    <FormHelperText error={!!errors?.password}>
                      {errors?.password?.message}
                    </FormHelperText>
                  )}
                  {/* Mostrar el mensaje de error general de loginError */}
                  {loginError && (
                    <FormHelperText error={!!loginError}>{loginError}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="button"
              onClick={handleValidateAndSubmit}
              sx={{ width: "40%", fontWeight: "bold" }}
              disabled={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Link
            color={"secondary"}
            sx={{ width: "max-content", cursor: "pointer" }}
            onClick={() => window.open("/forgot-password", "_blank")}
          >
            {"Olvide mi contraseña"}
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};
