const bcrypt = require('bcrypt');

exports.encodePassword = password => bcrypt.hash(password, 10);

exports.comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);
