import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material"; // Asegúrate de tener este ícono instalado
import { useState } from "react";
import { ICreateSpace } from "../../../../../../models/services/spaces.interfaces";
import { SpacesService } from "../../../../../../services/spaces/spaces.service";

interface IFormInput {
  reportDescription: string;
  spaceName: string;
  spaceLocation: string;
}

interface IProps {
  handleClose: () => void;
  open: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
  trigger: boolean
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalFormCreateSpaces = ({
  handleClose,
  open,
  setLoader,
  setTrigger,
  trigger
}: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoader(true)
    try {
      if (!imageFile) {
        setImageError("Por favor, sube una imagen");
        return;
      }
      const datareq : ICreateSpace = {
        name: data.spaceName,
        location: data.spaceLocation,
        description: data.reportDescription,
        image: imageFile
      }
      await SpacesService.create(datareq)
      handleClose();
      setTrigger(!trigger);
    } catch (error) {
      console.log('error al crear espacio', error)
    }
    setLoader(true)
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
          Registrar Nuevo Espacio
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Nombre del nuevo espacio"
            fullWidth
            margin="normal"
            {...register("spaceName", {
              required: "El nombre del espacio es requerido",
            })}
            error={!!errors.spaceName}
            helperText={errors.spaceName?.message}
          />
          <TextField
            label="Localización del Espacio"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register("spaceLocation", {
              required: "La localizacion del espacio es requerida",
            })}
            error={!!errors.spaceLocation}
            helperText={errors.spaceLocation?.message}
          />

          <TextField
            label="Descripción del Espacio"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register("reportDescription", {
              required: "La descripción del espacio es requerida",
            })}
            error={!!errors.reportDescription}
            helperText={errors.reportDescription?.message}
          />

          <FormControl fullWidth margin="normal">
            <input
              id="report-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="report-image">
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                width: "200px",
                height: "40px",
                border: '1px solid #828282',
                borderRadius: '8px'
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
                borderRadius: '8px',
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
