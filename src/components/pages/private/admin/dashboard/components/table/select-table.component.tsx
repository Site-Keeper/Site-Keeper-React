import React, { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
interface itemsPerPageProps {
    itemsPerPage: number;
    setItemsPerPage: (itemsPerPage: number) => void
}



export default function SelectAutoWidth({ itemsPerPage, setItemsPerPage }: itemsPerPageProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null); // Referencia al modal

    const options = [
        { value: 5, label: 5 },
        { value: 10, label: 10 },
        { value: 15, label: 15 },
    ];

    const handleSelect = (value: number) => {
        setItemsPerPage(value);
        setModalOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div style={{ position: 'relative' }}>
            <div
                onClick={() => setModalOpen(!isModalOpen)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {options.find(option => option.value === itemsPerPage)?.label ?? 'Select an option'}
                {isModalOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>

            {isModalOpen && (
                <div style={menuStyle} ref={modalRef}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                width: '100%',
                                display:'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent:'center',
                                padding: '10px'
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <Typography variant='subtitle2'>{option.label}</Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '88%',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '38px'
};