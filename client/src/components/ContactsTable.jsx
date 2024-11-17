import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const ContactsTable = ({ contacts, onUpdate, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editableRow, setEditableRow] = useState({});

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (index, row) => {
    setEditRowIndex(index);
    setEditableRow({ ...row });
  };

  const handleCancelEdit = () => {
    setEditRowIndex(null);
    setEditableRow({});
  };

  const handleSaveEdit = () => {
    onUpdate(editableRow);
    setEditRowIndex(null);
    setEditableRow({});
  };

  const handleFieldChange = (field, value) => {
    setEditableRow({ ...editableRow, [field]: value });
  };

  const fieldsToDisplay = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "company", label: "Company" },
    { key: "jobTitle", label: "Job Title" },
  ];

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {fieldsToDisplay.map(({ label }) => (
                <TableCell key={label}>{label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact, index) => (
                <TableRow key={contact.id || index}>
                  {fieldsToDisplay.map(({ key }) => (
                    <TableCell key={key}>
                      {editRowIndex === index ? (
                        <TextField
                          value={editableRow[key] || ""}
                          onChange={(e) => handleFieldChange(key, e.target.value)}
                          fullWidth
                        />
                      ) : (
                        contact[key]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editRowIndex === index ? (
                      <>
                        <IconButton onClick={handleSaveEdit}>
                          <Save />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton 
                          onClick={() => handleEditClick(index, contact)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDelete(contact)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ContactsTable;
