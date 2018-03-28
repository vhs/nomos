
const express = require('express');
const spec = require('./openapi.json');
const ServiceBase = require('./lib/service');

const app = express();

app.use('/help', express.static(require('./lib/swagger-ui-dist').absolutePath()));


app.use((req, res, next) => {
    if (req.path.endsWith('.json')) {
        res.sendfile(__dirname + req.path);
    } else {
        return next();
    }
});

const registry = {};


for (let path of Object.keys(spec.paths)) {
    let ref = null;
    if (ref = spec.paths[path]['$ref']) {
        const module = `./${ref.slice(0, ref.lastIndexOf('/path.spec.json'))}`;
        console.log(`Loading ${module}`);
        const Service = require(module)(ServiceBase);

        registry[Service.name] = new Service();
        registry[Service.name].registry = registry;

        app.all(path, (req, res) => {
            try {
                registry[Service.name].handle(req, res);
            } catch(ex) {
                res.status(500).json(ex);
            }
        });
    }
}

app.listen(3000, () => {
    console.log('listening');
});
