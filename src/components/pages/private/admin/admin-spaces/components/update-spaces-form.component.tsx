import React, { useEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUpdateSpace } from "../../../../../../models/services/spaces.interfaces";
import { SpacesService } from "../../../../../../services/spaces/spaces.service";
import { useState } from "react";
import { ISpace } from "../../../../../../models/interfaces";
import { Button, FormControl, FormHelperText, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CloudUpload } from "@mui/icons-material";

interface IFormInput {
    reportDescription: string;
    spaceName: string;
    spaceLocation: string;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    space?: ISpace;
    id: number;
}

export const ModalFormUpdateSpaces = ({
    handleClose,
    open,
    space,
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

    const updateFormValues = useCallback(() => {
        if (space) {
            setValue("spaceName", space.name);
            setValue("spaceLocation", space.location);
            setValue("reportDescription", space.description);
        }
    }, [space, setValue]);

    useEffect(() => {
        if (open) {
            updateFormValues();
        }
    }, [open, updateFormValues]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const datareq: IUpdateSpace = {
            name: data.spaceName,
            location: data.spaceLocation,
            description: data.reportDescription,
            image: imageFile
        }

        await SpacesService.update(datareq, String(id));
        handleClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
            setImageError(undefined);
        }
    };

    return(
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
            Editar Espacio: {space?.name}
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
                </Box>
              </label>
              {imageError && <FormHelperText error>{imageError}</FormHelperText>}
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                type="button"
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
    )
}