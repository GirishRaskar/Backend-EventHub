const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  Teachers: { type: String, required: true }
}, { collection: 'EventsForAll' }); // Specify the collection name as 'EventsForAll'

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
