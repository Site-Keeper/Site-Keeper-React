import { CloudUpload } from '@mui/icons-material'; // Asegúrate de tener este ícono instalado
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICreateReportReq } from '../../../../../../models/services/reports.interface';
import { ReportsService } from '../../../../../../services/Reports/reports.service';

interface IFormInput {
    reportTopic: string;
    reportName: string;
    reportDescription: string;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    id: number;
    objectId: number
    objectName:string
}

const Topic = [
    { value: 1, label: 'Mantenimiento' },
    { value: 2, label: 'Limpieza' },
    { value: 3, label: 'Seguridad' },
    { value: 4, label: 'Otros' },
];

export const ModalFormCreateReportsByObjects = ({ handleClose, open, id, objectId,objectName}: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [imageError, setImageError] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const topicnumber = Number(data.reportTopic);
        const datareq: ICreateReportReq = {
            name: data.reportName,
            description: data.reportDescription,
            isEvent: false,
            topicId: topicnumber,
            theDate: new Date().toISOString().slice(0, 19),
            spaceId: id,
            objectId: objectId,
            image: imageFile? imageFile : undefined,
        };
        await ReportsService.create(datareq);
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
                    gap: "10px",
                    borderRadius: '20px' 
                  }}
            >
                <Typography variant="h2" component="h2">
                    Añadir Reporte
                </Typography>
                <Typography variant='h3'>Objeto: ${objectName}</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nombre del Reporte"
                        fullWidth
                        margin="normal"
                        {...register('reportName', { required: 'El nombre del reporte es requerido' })}
                        error={!!errors.reportName}
                        helperText={errors.reportName?.message}
                    />
                    <TextField
                        label="Descripción del Reporte"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        {...register('reportDescription', { required: 'La descripción del reporte es requerida' })}
                        error={!!errors.reportDescription}
                        helperText={errors.reportDescription?.message}
                    />

                    <FormControl fullWidth margin="normal">
                        <input
                            id="report-image"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }} 
                            onChange={handleImageChange}
                        />
                        <label htmlFor="report-image">
                            <Box
                                sx={{
                                    border: '2px dashed #ccc',
                                    borderRadius: '4px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: '#f9f9f9',
                                    '&:hover': {
                                        bgcolor: '#f1f1f1',
                                    },
                                }}
                            >
                                <CloudUpload sx={{ fontSize: 40, color: '#777' }} />
                                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                                    Seleccione o arrastre su imagen aquí
                                </Typography>
                                {imageName && (
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                                        {imageName}
                                    </Typography>
                                )}
                            </Box>
                        </label>
                        {imageError && (
                            <FormHelperText error>{imageError}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.reportTopic}>
                        <InputLabel>Tema</InputLabel>
                        <Select
                            label="Tema"
                            defaultValue=""
                            {...register('reportTopic', { required: 'Por favor, selecciona un tema' })}
                        >
                            {Topic.map((topic) => (
                                <MenuItem key={topic.value} value={topic.value}>
                                    {topic.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.reportTopic?.message}</FormHelperText>
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor: 'secondary.main',
                                color: 'white',
                                width: "200px",
                                height: "40px",
                                ':hover': { bgcolor: 'secondary.dark' }
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
