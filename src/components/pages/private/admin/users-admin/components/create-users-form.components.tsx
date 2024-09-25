import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { USersService } from '../../../../../../services/users/users.service';

// Definición del tipo de los valores del formulario
interface IFormInput {
    role: string;
    personnelType?: string; // Agregamos el tipo de personal
}

interface IProps {
    handleClose: () => void;
    open: boolean;
}

const roles = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Personnel' },
    { value: 3, label: 'Employee' }
];

const personnelTypes = [
    { value: 'Maintenance', label: 'Mantenimiento' },
    { value: 'Janitorial', label: 'Limpieza' },
    { value: 'Security', label: 'Seguridad' },
    { value: 'Other', label: 'Otro' }
];

export const ModalFormCreateUsers = ({ handleClose, open }: IProps) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<IFormInput>();
    const [documents, setDocuments] = useState<number[]>([]);
    const [documentInput, setDocumentInput] = useState<number | null>(null);
    const [documentError, setDocumentError] = useState<string | null>(null);

    const selectedRole = watch('role'); 

    useEffect(() => {
        if (selectedRole !== '2') { 
            setValue('personnelType', undefined);
        }
    }, [selectedRole, setValue]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (documents.length === 0) {
            setDocumentError('Debe agregar al menos un documento');
            return; 
        }
        const roleId = Number(data.role);
        await USersService.postUser({ doc_numbers: documents, role_id: roleId, personnel_type: data.personnelType });
        setDocumentError(null); 
        setDocuments([]);
        handleClose();
    };

    const handleAddDocument = () => {
        if (documentInput !== null && !documents.includes(documentInput)) {
            setDocuments([...documents, documentInput]); 
            setDocumentInput(null); 
            setDocumentError(null); 
        }
    };

    const handleDeleteDocument = (docToDelete: number) => {
        setDocuments(documents.filter(doc => doc !== docToDelete));
    };

    return (
        <Modal open={open} onClose={handleClose}>
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
                    Añadir Usuario
                </Typography>
                <Box>
                    {documents.length === 0 ? (
                        <Typography variant="subtitle1">No hay documentos agregados.</Typography>
                    ) : (
                        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {documents.map((doc, index) => (
                                <Chip
                                    key={index}
                                    label={doc}
                                    onDelete={() => handleDeleteDocument(doc)}
                                    deleteIcon={<CloseIcon />}
                                    sx={{
                                        color: 'secondary.main',
                                        borderColor: 'secondary.main',
                                        height: 36,
                                        fontSize: 16,
                                        ':hover': { color: 'rgb(80, 65, 200)', borderColor: 'rgb(80, 65, 200)' },
                                        '& .MuiChip-deleteIcon': {
                                            color: 'rgb(107, 92, 255)',
                                            '&:hover': {
                                                color: 'rgb(80, 65, 200)',
                                            },
                                        },
                                    }}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    )}
                </Box>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TextField
                            label="Identificación del Usuario"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={documentInput || ''}
                            onChange={(e) => setDocumentInput(Number(e.target.value))}
                        />
                        <IconButton
                            sx={{
                                border: "1px solid #828282",
                                ":hover": { backgroundColor: "#828282", color: "#fff" },
                                height: "40px",
                                width: "40px",
                            }}
                            onClick={handleAddDocument}
                            aria-label="add document"
                        >
                            <AddIcon sx={{ color: "#828282", '&:hover': { color: '#fff' } }} />
                        </IconButton>
                    </Box>
                    {documentError && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {documentError}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FormControl fullWidth margin="normal" error={!!errors.role}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                defaultValue=""
                                {...register('role', { required: 'Please select a role' })}
                                sx={{ width: "200px" }}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.role?.message}</FormHelperText>
                        </FormControl>

                        {Number(selectedRole) === 2 && (
                            <FormControl fullWidth margin="normal" error={!!errors.personnelType}>
                                <InputLabel>Tipo de Personal</InputLabel>
                                <Select
                                    label="Tipo de Personal"
                                    {...register('personnelType', { required: 'Please select a personnel type' })}
                                    sx={{ width: "200px" }}
                                >
                                    {personnelTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.personnelType?.message}</FormHelperText>
                            </FormControl>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: 'secondary.main', color: 'white', width: "200px", height: "40px" }}
                        >
                            Enviar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
