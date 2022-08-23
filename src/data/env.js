
module.exports = function() {

  return {
    name: process.env.name || "production",
    url: (process.env.name) ? "http://localhost:8888" : process.env.DEPLOY_URL
  };
};
