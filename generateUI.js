var UI = require(__dirname + '/UI/generator');

fs.writeFileSync(
       __dirname + '/apps/udp/index.html',
        UI.generate(__dirname + '/apps/udp/conf.json')
      );
