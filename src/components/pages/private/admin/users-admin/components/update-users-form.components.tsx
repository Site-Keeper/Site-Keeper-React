import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserToRows } from "../../../../../../models/interfaces/user-to-rows.interface";
import { USersService } from "../../../../../../services/users/users.service";
import { IUpdateUserReq } from "../../../../../../models/services/users.interfaces";

interface IProps {
    user: IUserToRows;
    handleClose: () => void;
    open: boolean;
}

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number; // Añadir el campo de rol
}

const roles = [{ value: 1, label: "admin" }, { value: 2, label: "personnel" }, { value: 3, label: "employed"}]; // Lista de roles

export const ModalFormUpdateUsers = ({ user, handleClose, open }: IProps) => {
    const userRol = roles.find((rol) => rol.label === user.rol);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const newObject: IUpdateUserReq = {
            name: undefined,
            email: undefined,
            role: undefined, 
        };
        if ( data.name !== user.name) {
            newObject.name = data.name;
        }
        if ( data.email !== user.email) {
            newObject.email = data.email;
        }
        if ( data.role !== userRol?.value) {
            newObject.role = data.role;
        }
        
        await USersService.updateUser(newObject, user.id);
        handleClose(); 
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
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Rol</InputLabel>
                            <Select
                                labelId="role-label"
                                {...register("role", { required: "El rol es requerido" })}
                                defaultValue={userRol?.value}
                                error={!!errors.role}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label} {/* Mostrar la etiqueta del rol */}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.role && <Typography color="error">{errors.role.message}</Typography>}
                        </FormControl>
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
