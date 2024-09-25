import { useForm, SubmitHandler } from "react-hook-form";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { emptyUserState } from "../../../../../state/redux/states/user";
import { IUser } from "../../../../../models/interfaces";
import { useState } from "react";
import { USersService } from "../../../../../services/users/users.service";

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const MyProfile = () => {
    const [changeName, setChangeName] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar la contraseña
    const {
        register,
        handleSubmit,
        reset, // Agregar reset de react-hook-form
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    let user: IUser = emptyUserState;
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("token")) {
        user = JSON.parse(sessionStorage.getItem("user") ?? "");
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (changePassword && data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const newObject = {
            name: data.name,
            email: data.email,
            password: changePassword ? data.password : undefined,
        };
        await USersService.updateUser(newObject, user.id);
        handleCancel()
    };

    const handleCancel = () => {
        reset({ 
            name: user.name, 
            email: user.email, 
            password: "", 
            confirmPassword: "" 
        });
        // Resetear estados de edición
        setChangeName(false);
        setChangeEmail(false);
        setChangePassword(false);
    };

    const password = watch("password");

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "100vw" }}>
            <Box
                sx={{
                    width: "620px",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                }}
            >   
                <Typography variant="h2" component="h2">
                    Mi Perfil
                </Typography>
                {!user.name && !user.email && <Typography variant="subtitle2"  color="gray">Porfavor cambie su contraseña y agregue su nombre y email</Typography>}
                <form
                    style={{ display: "flex", flexDirection: "column", gap: "15px" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="subtitle1">Documento: {user.doc_number}</Typography>

                    {/* Cambiar Nombre */}
                    {!user.name || changeName ? (
                        <TextField
                            label="Nombre"
                            fullWidth
                            {...register("name", {
                                required: "El nombre es requerido",
                            })}
                            defaultValue={user.name}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="subtitle1">Nombre: {user.name}</Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ cursor: "pointer", color: "secondary.main", textDecoration: "underline" }}
                                onClick={() => setChangeName(true)}
                            >
                                Cambiar
                            </Typography>
                        </Box>
                    )}

                    {/* Validación de Email */}
                    {!user.email || changeEmail ? (
                        <TextField
                            label="Email"
                            fullWidth
                            {...register("email", {
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Formato de email inválido",
                                },
                            })}
                            defaultValue={user.email}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="subtitle1">Email: {user.email}</Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ cursor: "pointer", color: "secondary.main", textDecoration: "underline" }}
                                onClick={() => setChangeEmail(true)}
                            >
                                Cambiar
                            </Typography>
                        </Box>
                    )}

                    {changePassword && (
                        <>
                            <TextField
                                label="Nueva Contraseña"
                                type={showPassword ? "text" : "password"} // Control para mostrar/ocultar contraseña
                                fullWidth
                                {...register("password", {
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres",
                                    },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)} // Alterna entre mostrar y ocultar
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirmar Contraseña"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                {...register("confirmPassword", {
                                    required: "Por favor confirma tu contraseña",
                                    validate: (value) => value === password || "Las contraseñas no coinciden",
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </>
                    )}

                    <Typography
                        variant="subtitle1"
                        sx={{ cursor: "pointer", color: "secondary.main", textDecoration: "underline" }}
                        onClick={() => setChangePassword(!changePassword)}
                    >
                        {changePassword ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
                    </Typography>

                    {/* Botones */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                color: "white",
                                width: "200px",
                                height: "40px",
                                border: "1px solid #828282",
                                borderRadius: "8px",
                            }}
                            onClick={handleCancel} // Asignar el reset al botón cancelar
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor: "secondary.main",
                                color: "white",
                                width: "200px",
                                height: "40px",
                                borderRadius: "8px",
                                ":hover": { bgcolor: "secondary.dark" },
                            }}
                        >
                            Enviar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};
