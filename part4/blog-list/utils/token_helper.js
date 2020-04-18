const get_token = (request) => {
  const authHeader = request.get("Authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7);
  }
};
module.exports = { get_token };
