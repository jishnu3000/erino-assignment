import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import { Container, Typography, Box } from "@mui/material";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getAll();
        setContacts(data);
      } catch (error) {
        console.error("Error when fetching contacts: ", error);
      }
    };
    fetchContacts();
  }, []);

  const handleSaveContact = async (newContact) => {
    try {
      const savedContact = await contactService.create(newContact);
      setContacts((prev) => [...prev, savedContact]);
      setNotification({
        open: true,
        message: "Contact saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving contact:", error);
      if (error.response && error.response.status === 409) {
        setNotification({
          open: true,
          message: "Duplicate email or phone number!",
          severity: "error",
        });
      } else {
        setNotification({
          open: true,
          message: "Error saving contact.",
          severity: "error",
        });
      }
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const { id } = updatedContact;
      const savedContact = await contactService.update(id, updatedContact);
      setContacts((prev) =>
        prev.map((contact) => (contact.id === id ? savedContact : contact))
      );
      setNotification({
        open: true,
        message: "Contact updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      setNotification({
        open: true,
        message: "Error updating contact.",
        severity: "error",
      });
    }
  };

  const handleDeleteContact = async (contactToDelete) => {
    try {
      const { id } = contactToDelete;
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      setNotification({
        open: true,
        message: "Contact deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      setNotification({
        open: true,
        message: "Error deleting contact.",
        severity: "error",
      });
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

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  );
};

export default App;
