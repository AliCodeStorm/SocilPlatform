const app = require("./app"); 
const connectDB = require("./config/db.config");
const{port}=require("./config/config");
connectDB()
  .then(() => {

    app.listen(port, () => {
      console.log(`🌐 Server running on port ${port}`);
    });

  })
  .catch((error) => {

    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 

  });