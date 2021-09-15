const app = require('./app');
const PORT = process.env.PORT || 23750;

app.listen(PORT, err => {
    console.log(`running on port ${PORT}`)
})