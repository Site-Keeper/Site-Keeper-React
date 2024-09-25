import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateSpace } from "../../../../../../models/services/spaces.interfaces";
import { SpacesService } from "../../../../../../services/spaces/spaces.service";
import { useState } from "react";
import { ISpace } from "../../../../../../models/interfaces";

interface IFormInput {
    reportDescription: string;
    spaceName: string;
    spaceLocation: string;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    space?: ISpace;
}

export const ModalFormUpdateSpaces = ({
    handleClose,
    open,
    space
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
        if (!imageFile) {
            setImageError("Por favor, sube una imagen");
            return;
        }
        const datareq: ICreateSpace = {
            name: data.spaceName,
            location: data.spaceLocation,
            description: data.reportDescription,
            image: imageFile
        }

        await SpacesService.update(datareq)
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


}