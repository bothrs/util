// Alternative
export function verifyUser(req) {
  return !!req.user
}

export function verifyUserTable(req, tbl) {
  return req.user && req.user.email && req.params.tbl === tbl
}

// Check if user is handling object that he owns
export function verifyEmail(req, prop) {
  return req.user && req.user.email && req.body[prop] === req.user.email
}
