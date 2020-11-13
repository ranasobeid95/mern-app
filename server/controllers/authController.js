exports.signUp = (req, res) => {
  const { email, password } = req.body;

  res.send('signUp');
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  res.send('login');
};
