Students.attachSchema(new SimpleSchema({
  omegaId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  rut: {
    type: String,
  },
  digit: {
    type: String,
  },
  email: {
    type: String,
  }
}));