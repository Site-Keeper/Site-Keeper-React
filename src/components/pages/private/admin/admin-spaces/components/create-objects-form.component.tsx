import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { ICreateObjectsReq } from "../../../../../../models/services/objects.interfaces";
import { ObjectsService } from "../../../../../../services/objects/obejcts.service";

interface IFormInput {
  name: string;
  description: string;
  image: string; // Cambiado a string
}

interface IProps {
  handleClose: () => void;
  open: boolean;
  id: number;
}

export const ModalFormCreateObject = ({
  handleClose,
  open,
  id,
}: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newObject: ICreateObjectsReq = {
        name : data.name,
      description : data.description,
      image : data.image, 
      spaceId : id,
    };

    await ObjectsService.create(newObject);
    console.log(newObject);
    handleClose();
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
          <TextField
            label="Icono MUI"
            fullWidth
            margin="normal"
            {...register("image", {
              required: "La URL de la imagen es requerida",
            })}
            error={!!errors.image}
            helperText={errors.image?.message}
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
