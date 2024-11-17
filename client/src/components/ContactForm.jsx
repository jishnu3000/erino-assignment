import { TextField, Button, Grid2, Box } from "@mui/material";
import { useState } from "react";

const ContactForm = ({ onSave }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1 }}>
      <Grid2 container spacing={2}>
        {["firstName", "lastName", "email", "phone", "company", "jobTitle"].map(
          (field) => (
            <Grid2 xs={12} sm={6} key={field}>
              <TextField
                label={field.split(/(?=[A-Z])/).join(" ")}
                variant="outlined"
                fullWidth
                name={field}
                value={contact[field]}
                onChange={handleChange}
                required={["firstName", "email", "phone"].includes(field)}
              />
            </Grid2>
          )
        )}
        <Grid2 xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ContactForm;
