exports.health = (req, res) => {
  res.json({
    status: 'OK'
  });
};

exports.root = (req, res) => {
  res.json({
    response: res.locals.responseText
  });
};

exports.clean = (req, res) => {
  res.json();
  //res.send();
};
