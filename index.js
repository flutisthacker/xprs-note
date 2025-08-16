const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Basic Approach: Render EJS template with static data
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'notes.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    console.log(data)
    // res.json(data); // Send file content as response
    res.render('index', { name: 'World',data: JSON.parse(data) });
  });
});



/* 
Advanced Approach: Render EJS template
with asynchronously fetched data
*/
app.get('/dynamic', async (req, res) => {
    const dynamicData = await fetchData();
    res.render('dynamic', { data: dynamicData });
});

// Function to simulate asynchronous data fetching
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Dynamic Content');
        }, 1000);
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});