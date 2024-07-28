const mongoose = require('mongoose');
const Activity = require('./models/Activity');

const uri = 'mongodb+srv://riyazmittu:zwD6eM7FGNDhfC4s@cluster0.k7h5qfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      await Activity.updateMany({}, {
        $unset: { capacity: "", vacancy: "" }
      });
      console.log('Fields removed successfully');
    } catch (error) {
      console.error('Error removing fields:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
