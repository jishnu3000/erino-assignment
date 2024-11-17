const contactsRouter = require("express").Router();
const Contact = require("../models/contact");

contactsRouter.get("/contacts", async (request, response) => {
  const blogs = await Contact.find({})
  response.json(blogs);
});

contactsRouter.post("/contacts", async (request, response, next) => {
  const body = request.body;

  const contact = new Contact({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    company: body.company,
    jobTitle: body.jobTitle,
  });

  if (!contact.firstName || !contact.email || !contact.phone) {
    response.status(400).end();
  } else {
    const savedContact = await contact.save();
    response.status(201).json(savedContact);
  }
});

module.exports = contactsRouter;