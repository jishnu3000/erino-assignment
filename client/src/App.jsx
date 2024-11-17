import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import { Container, Typography, Box } from "@mui/material";

const App = () => {
  const [contacts, setContacts] = useState([]);
  
  const handleSaveContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.email === updatedContact.email ? updatedContact : contact
      )
    );
  };

  const handleDeleteContact = (contactToDelete) => {
    setContacts((prev) =>
      prev.filter((contact) => contact.email !== contactToDelete.email)
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contacts CRUD Management
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <ContactForm onSave={handleSaveContact} />
      </Box>
      <ContactsTable
        contacts={contacts}
        onUpdate={handleUpdateContact}
        onDelete={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
