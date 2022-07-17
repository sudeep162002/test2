import React, { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
    Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import ThemeWrapper from "../utils/styleUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 600,
  bgcolor: "var(--main-black)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function AddQuestionModal(props) {
  const { open, handleClose } = props;
  const [type, setType] = useState();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const addOption = () => {
    setOptions((prev) => [...prev, { id: prev.length + 1, content: option }]);
    setOption("");
  };
  return (
    <ThemeWrapper>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography component="h6" variant="h6">
              Add Question
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <TextField
                label="Question"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>

            <FormControl required fullWidth sx={{ my: 2 }}>
              <InputLabel>Select Type</InputLabel>
              <Select
                value={type}
                label="Select Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value={"mosa"}>Multi-Option Single-Answer</MenuItem>
                <MenuItem value={"moma"}>Multi-Option Multi-Answer</MenuItem>
                <MenuItem value={"mosaf"}>
                  Multi-Option Single-Answer Image
                </MenuItem>
                <MenuItem value={"momaf"}>
                  Multi-Option Multi-Answer Image
                </MenuItem>
              </Select>
            </FormControl>
            {options.length && (
              <FormControl fullWidth>
                {type === "mosa" ? (
                  <RadioGroup name="radio-buttons-group" defaultValue={null}>
                    {options.map((option) => (
                      <FormControlLabel
                        value={option.content}
                        control={<Radio />}
                        label={option.content}
                      />
                    ))}
                  </RadioGroup>
                ) : type === "moma" ? (
                  <FormGroup>
                    {options.map((option) => (
                      <FormControlLabel
                        value={option.content}
                        control={<Checkbox />}
                        label={option.content}
                      />
                    ))}
                  </FormGroup>
                ) : (
                  ""
                )}
              </FormControl>
            )}
            <FormControl fullWidth sx={{ my: 2 }}>
              <TextField
                label="Option"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              />
              <button className="btn" onClick={addOption}>
                Add Option
              </button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </ThemeWrapper>
  );
}

export default AddQuestionModal;
