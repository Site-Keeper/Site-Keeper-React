import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { useRef } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "10px",
  backgroundColor: alpha("#868181", 0.1),
  '&:hover': {
    backgroundColor: alpha("#868181", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '400px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '400px'
  },
}));

interface Props {
  setSearch : React.Dispatch<React.SetStateAction<string>>
}



export function SearchInput({setSearch}:Props) {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const value = event.target.value;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setSearch(value)
    }, 500);
  }

  return (
    <>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(event) => handleChanges(event)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    </>
  );
}
