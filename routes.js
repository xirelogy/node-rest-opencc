const opencc = require('opencc');

const configs = ['s2t', 't2s', 's2tw', 'tw2s', 's2hk', 'hk2s', 's2twp', 'tw2sp', 't2tw', 't2hk', 't2jp', 'jp2t'];
const instances = {};
configs.forEach((configName) => {
  const config = configName + '.json';
  instances[config] = new opencc(config);
});

exports.index = function (req, res) {
  return res.status(200).end('OpenCC REST API');
};

exports.convert = function (req, res) {
  var text = req.body.text;
  const config = req.body.config;

  res.setHeader('Content-Type', 'application/json');

  if (!instances[config]) {
    return res.status(400).end(JSON.stringify({message: 'Invalid config'}));
  }

  var openccInst = new opencc(config);
  openccInst.convert(text, function(err, converted) {
    if (err) {
      res.status(400).end(JSON.stringify({message: 'OpenCC: ' + err}));
    }
    res.end(JSON.stringify({result: converted}));
  });
};
