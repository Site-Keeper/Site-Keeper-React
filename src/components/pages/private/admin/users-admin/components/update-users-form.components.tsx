import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserToRows } from "../../../../../../models/interfaces/user-to-rows.interface";
import { USersService } from "../../../../../../services/users/users.service";

interface IProps {
    user: IUserToRows;
    handleClose: () => void;
    open: boolean;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
    trigger: boolean
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number; // Añadir el campo de rol
}

const roles = [{ value: 1, label: "admin" }, { value: 2, label: "personnel" }, { value: 3, label: "employed" }]; // Lista de roles

export const ModalFormUpdateUsers = ({ user, handleClose, open, setLoader, trigger, setTrigger }: IProps) => {
    const userRol = roles.find((rol) => rol.label === user.rol);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoader(true)
        try {
            const newObject = {
                name: data.name,
                email: data.email,
                role: data.role,
            };
            await USersService.updateUser(newObject, user.id);
            console.log(newObject);
            handleClose();
        } catch (error) {
            console.log('error al actualizar el usuario:', error);
        }
        setTrigger(!trigger)
        setLoader(false)
    };

    const handleCancel = () => {
        reset({
            name: user.name,
            email: user.email,
            password: "",
            confirmPassword: "",
            role: userRol?.value,
        });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "100vw" }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "620px",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        padding: "30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography variant="h2" component="h2">
                        Editar usuario
                    </Typography>
                    <form
                        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Typography variant="subtitle1">Documento: {user.doc_number}</Typography>
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
                                onClick={handleCancel}
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
        </Modal>
    );
};
