import mongoose from 'mongoose'

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://gberi2012:${password}@cluster0.a2bfzeu.mongodb.net/test`

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then(result => {
        console.log('connected to MongoDB');
        const note = new Note({
            content: 'test',
            important: true,
        });
        return note.save();
    })
    .then(() => {
        console.log('note saved');
        return mongoose.connection.close
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })