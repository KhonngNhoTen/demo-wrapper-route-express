const app = require("./app");

app.start(() => {
  app.listen(6504, async () => {
    console.log("SERVER RUN AT PORT 6504");
  });
});
