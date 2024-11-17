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
  Button,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const ContactsTable = ({ contacts, onUpdate, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editableRow, setEditableRow] = useState({});

  const handleChangePage = (newPage) => {
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
    onUpdate(editableRow); // Send updated row data to the parent
    setEditRowIndex(null);
    setEditableRow({});
  };

  const handleFieldChange = (field, value) => {
    setEditableRow({ ...editableRow, [field]: value });
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "First Name",
                "Last Name",
                "Email",
                "Phone Number",
                "Company",
                "Job Title",
                "Actions",
              ].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact, index) => (
                <TableRow key={index}>
                  {Object.keys(contact).map((field, idx) => (
                    <TableCell key={idx}>
                      {editRowIndex === index ? (
                        <TextField
                          value={editableRow[field]}
                          onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                          }
                          fullWidth
                        />
                      ) : (
                        contact[field]
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
