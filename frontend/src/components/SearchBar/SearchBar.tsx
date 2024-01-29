import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchBarProps {
  searchFunction: (search: string) => void;
}

function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <div>
      <TextField
        label="Pesquisar"
        variant="standard"
        onChange={(event) => props.searchFunction(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }} />
    </div>
  )
}

export default SearchBar;