const server = require("./server");

//set the port here
const port = process.env.PORT || 3000;

//return the HTTP server
server.listen(port, () => console.log(`Server is listening on port ${port}`));
