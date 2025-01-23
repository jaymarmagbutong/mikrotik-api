import app from './src/app.js';


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Mikrotik API is running on port ${port}`);
});
