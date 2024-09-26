import React, { useEffect, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISpace } from "../../../../../../models/interfaces";
import { SpacesService } from "../../../../../../services/spaces/spaces.service";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CloudUpload } from "@mui/icons-material";
import { LostObjectsService } from "../../../../../../services/lostObjects/lost-objects.service";
import { ILostObject } from "../../../../../../models/interfaces/lost-object.interface";
import { IUpdateLostObject } from "../../../../../../models/services/lost-object.interfaces";

interface IFormInput {
    name: string;
    description: string;
    space: string;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    object?: ILostObject;
    id: number;
}

export const ModalFormUpdateLostObject = ({
    handleClose,
    open,
    object,
    id
}: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IFormInput>();

    const [imageError, setImageError] = useState<string | undefined>();
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [spaces, setSpaces] = useState<ISpace[]>([]);

    const fetchSpaces = useCallback(async () => {
        const fetchedSpaces = await SpacesService.getAll();
        setSpaces(fetchedSpaces);
    }, []);

    useEffect(() => {
        fetchSpaces();
    }, [fetchSpaces]);

    const updateFormValues = useCallback(() => {
        if (object) {
            setValue("name", object.name);
            setValue("description", object.description);
            setValue("space", object.spaceId ? object.spaceId.toString() : "");
        }
    }, [object, setValue]);

    useEffect(() => {
        if (open) {
            updateFormValues();
        }
    }, [open, updateFormValues]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!object) return;

        const updatedObject: IUpdateLostObject = {
            name: data.name,
            description: data.description,
            spaceId: Number(data.space),
            image: imageFile,
        };

        console.log(updatedObject);
        

        await LostObjectsService.update(updatedObject, String(id));
        handleClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
            setImageError(undefined);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "620px",
                    bgcolor: "white",
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    border: "none",
                }}
            >
                <Typography variant="h2" component="h2">
                    Editar Objeto {object?.name}
                </Typography>
                <form
                    style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="Nombre del Objeto"
                        fullWidth
                        margin="normal"
                        {...register("name", {
                            required: "El nombre del objeto es requerido",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Descripción del Objeto"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        {...register("description", {
                            required: "La descripción es requerida",
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />

                    <FormControl fullWidth margin="normal" error={!!errors.space}>
                        <InputLabel>Espacio</InputLabel>
                        <Select
                            label="Espacio"
                            {...register("space", {
                                required: "El espacio es requerido",
                            })}
                            defaultValue=""
                        >
                            {spaces.length > 0 ? spaces.map((space) => (
                                <MenuItem key={space.id} value={space.id}>
                                    {space.name}
                                </MenuItem>
                            )) : (
                                <MenuItem value="">
                                    No spaces available
                                </MenuItem>
                            )}
                        </Select>
                        {errors.space && (
                            <FormHelperText>{errors.space.message}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <input
                            id="object-image"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="object-image">
                            <Box
                                sx={{
                                    border: "2px dashed #ccc",
                                    borderRadius: "4px",
                                    padding: "20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    bgcolor: "#f9f9f9",
                                    "&:hover": {
                                        bgcolor: "#f1f1f1",
                                    },
                                }}
                            >
                                <CloudUpload sx={{ fontSize: 40, color: "#777" }} />
                                <Typography
                                    variant="body1"
                                    sx={{ mt: 1, color: "text.primary" }}
                                >
                                    Seleccione o arrastre su imagen aquí
                                </Typography>
                            </Box>
                        </label>
                        {imageError && <FormHelperText error>{imageError}</FormHelperText>}
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                color: "white",
                                width: "200px",
                                height: "40px",
                                border: "1px solid #828282",
                                borderRadius: "8px",
                            }}
                            onClick={handleClose}
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
                            Actualizar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};