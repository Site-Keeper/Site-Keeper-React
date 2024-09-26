import { useForm, SubmitHandler } from "react-hook-form";
import {
    Modal,
    Box,
    Button,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { ISpace } from "../../../../../../models/interfaces";
import { SpacesService } from "../../../../../../services/spaces/spaces.service";
import { LostObjectsService } from "../../../../../../services/lostObjects/lost-objects.service";

interface IFormInput {
    name: string;
    description: string;
    space: string; // Campo select para espacios
    image: File | null; // Imagen como archivo
}

interface IProps {
    handleClose: () => void;
    open: boolean;
}

export const ModalFormCreateObjectWithSpaces = ({
    handleClose,
    open,
}: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const [imageError, setImageError] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [spaces, setSpaces] = useState<ISpace[]>([]);

    useEffect(() => {
        const fetchSpaces = async () => {
            const fetchedSpaces = await SpacesService.getAll();
            setSpaces(fetchedSpaces);
        };
        fetchSpaces();
    }, []);


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!imageFile) {
            setImageError("Por favor, sube una imagen");
            return;
        }

        const space_id = Number(data.space);

        const newObject = {
            name: data.name,
            description: data.description,
            spaceId: space_id,
            image: imageFile,
        };
        await LostObjectsService.create(newObject);
        console.log(newObject);
        handleClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
            setImageName(files[0].name);
            setImageError(null);
        }
    };

    const handleclosemodal = () => {
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleclosemodal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "620px",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    border: "none",
                }}
            >
                <Typography variant="h2" component="h2">
                    Crear Nuevo Objeto
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

                    {/* Campo Select para Espacios */}
                    <FormControl fullWidth margin="normal" error={!!errors.space}>
                        <InputLabel>Espacio</InputLabel>
                        <Select
                            label="Espacio"
                            {...register("space", {
                                required: "El espacio es requerido",
                            })}
                            defaultValue=""
                        >
                            {spaces.map((space) => (
                                <MenuItem key={space.id} value={space.id}>
                                    {space.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.space && (
                            <FormHelperText>{errors.space.message}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Input de archivo para imagen */}
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
                                {imageName && (
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, color: "text.primary" }}
                                    >
                                        {imageName}
                                    </Typography>
                                )}
                            </Box>
                        </label>
                        {imageError && <FormHelperText error>{imageError}</FormHelperText>}
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
                            Enviar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
