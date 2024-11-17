const contactsRouter = require("express").Router();
const { request, response } = require("express");
const Contact = require("../models/contact");

contactsRouter.get("/", async (request, response, next) => {
  try {
    const contacts = await Contact.find({});
    response.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (request, response, next) => {
  try {
    const { firstName, lastName, email, phone, company, jobTitle } = request.body;

    if (!firstName || !email || !phone) {
      return response.status(400).json({
        error: "First Name, Email, and Phone are required fields.",
      });
    }

    const existingContact = await Contact.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingContact) {
      return response.status(409).json({
        error: "A contact with the same email or phone number already exists.",
      });
    }

    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    });

    const savedContact = await contact.save();
    return response.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    if (!updateData.firstName || !updateData.email || !updateData.phone) {
      return response.status(400).json({
        error: "First Name, Email, and Phone are required fields for update.",
      });
    }

    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return response.status(404).json({
        error: "Contact not found.",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return response.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
})

contactsRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return response.status(404).json({
        error: "Contact not found.",
      });
    }

    await Contact.findByIdAndDelete(id);

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = contactsRouter;