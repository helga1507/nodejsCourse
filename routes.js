const fs = require('fs');

const handlerRouting = (req, res) => {
  const {url, method} = req;
  res.setHeader('Content-Type', 'text/html');

  if(url === '/users'){
   return fs.readFile('users.html',  (err, users) => {
      if (err) throw err;

      res.write(users);

      return res.end();
    });
  }
  else if(url === '/create-user' && method === 'POST'){
    const bodyReq = [];

    req.on('data', chunk => bodyReq.push(chunk));

    return req.on('end', () => {
      const parseBody = Buffer.concat(bodyReq).toString().split('&');

      parseBody.forEach(item => {
        const data = item.split('=');

        console.log(data[0],data[1]);
      });

      res.writeHead(302, {Location: '/users'});

      return res.end();
    });
  }

  fs.readFile('home.html',  (err, homePage) => {
    if (err) throw err;

    res.write(homePage);

    return res.end();
  });

};

module.exports = handlerRouting;