const web = require("./web");
const migrate = require("./migrate");

migrate().then(() => {
  web.server.listen(3000);
  
  console.log("listening 3000...");
}).catch(err => console.error(err));
