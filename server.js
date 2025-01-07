const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const uri = "mongodb+srv://arusharamessur:arusha@cluster0.we7t3ax.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
app.use(express.json());

// Serve static files from the directory: index.html
app.use(express.static(path.join(__dirname)));

// Start the server on port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000");
})

// POST route to create a new resource
app.post('/M00940320/userRegistration', async (req, res) => {
  try {
    const db = client.db('Social_Media');
    const collection = db.collection('user');
    
    const { name, email, password } = req.body;
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const result = await collection.insertOne({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route to retrieve details of a resource
app.get('/M00940320/userRegistration', async (req, res) => {
  try {
    // Connect to the MongoDB 
    await client.connect();
    const db = client.db('Social_Media');
    const collection = db.collection('user');
    
    // Retrieve details of a resource 
    const details = await collection.findOne();
    
    // Send the document back as JSON
    res.json(details);
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error status
    res.status(500).send(error.message);
  } finally {
    // Close the MongoDB connection to ensure it's closed regardless of success or failure
    await client.close();
  }
});

// POST route to create a new resource
app.post('/M00940320/userLogin', async (req, res) => {
  try {
    const db = client.db('Social_Media');
    const collection = db.collection('user');

    const { email, password } = req.body;
    const user = await collection.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed. This user does not exist, please create an account' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route to retrieve details of a resource
app.get('/M00940320/userLogin', async (req, res) => {
  try {
    // Connect to the MongoDB 
    await client.connect();
    const db = client.db('Social_Media');
    const collection = db.collection('user');
    
    // Retrieve details of a resource 
    const details = await collection.findOne();
    
    // Send the document back as JSON
    res.json(details);
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error status
    res.status(500).send(error.message);
  } finally {
    // Close the MongoDB connection to ensure it's closed regardless of success or failure
    await client.close();
  }
});


// POST route to create a new resource
app.post('/M00940320/post', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db('Social_Media');
    const collection = db.collection('post'); 

    // Insert the data from the request body
    const result = await collection.insertOne({ caption: req.body.caption });

    // Respond with the result of the insert operation
    res.status(201).json(result);
    res.status(201).json({ caption: req.body.caption });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error status
    res.status(500).send(error.message);
  } finally {
    // Close the MongoDB connection in the 'finally' block to ensure it's closed regardless of success or failure
    await client.close();
  }
});

// GET route to retrieve details of a resource
app.get('/M00940320/post', async (req, res) => {
try {
  // Connect to the MongoDB 
  await client.connect();
  const db = client.db('Social_Media');
  const collection = db.collection('post');
  
  // Retrieve details of a resource 
  const details = await collection.findOne();
  
  // Send the document back as JSON
  res.json(details);
} catch (error) {
  // Handle errors and respond with a 500 Internal Server Error status
  res.status(500).send(error.message);
} finally {
  // Close the MongoDB connection to ensure it's closed regardless of success or failure
  await client.close();
}
});

// POST route to store a new comment
app.post('/M00940320/comment', async (req, res) => {
  try {
    // Connect to MongoDB 
    await client.connect();
    const db = client.db('Social_Media');
    const collection = db.collection('comment');

    // Insert the comment data from the request body 
    const result = await collection.insertOne({ comment: req.body.comment });

    // Respond with the result of the insert operation
    res.status(201).json(result);
    res.status(201).json({ comment: req.body.comment });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error status
    res.status(500).send(error.message);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});


// GET route to retrieve details of a resource
app.get('/M00940320/comment', async (req, res) => {
try {
  // Connect to the MongoDB 
  await client.connect();
  const db = client.db('Social_Media');
  const collection = db.collection('comment');
  
  // Retrieve details of a resource 
  const details = await collection.findOne();
  
  // Send the document back as JSON
  res.json(details);
} catch (error) {
  // Handle errors and respond with a 500 Internal Server Error status
  res.status(500).send(error.message);
} finally {
  // Close the MongoDB connection to ensure it's closed regardless of success or failure
  await client.close();
}
});