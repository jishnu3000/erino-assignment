import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import { Container, Typography, Box } from "@mui/material";
import contactService from './services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getAll();
        setContacts(data);
      } catch (error) {
        console.error("Error when fetching contacts: ", error);
      }
    }
    fetchContacts();
  }, [])
  
  const handleSaveContact = async (newContact) => {
    try {
      const savedContact = await contactService.create(newContact);
      setContacts((prev) => [...prev, savedContact]);
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const { id } = updatedContact;
      const savedContact = await contactService.update(id, updatedContact);
      setContacts((prev) =>
        prev.map((contact) => (contact.id === id ? savedContact : contact))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactToDelete) => {
    try {
      const { id } = contactToDelete;
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
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
