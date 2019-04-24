const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const _ = require('lodash');

const { appModules } = require('./app.config');
const { logger } = require('./middleware/logs');
const { response } = require('./middleware/response');

// Configuration
const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(response);

// Dynamic route loading
if (appModules) {
	_.forEach(appModules, (category, key) => {
		_.forEach(category.modules, (item) => {
			const modulePath = `./modules/${key}/${item}/${item}.router.js`;
			if (!fs.existsSync(modulePath)) {
				throw new Error(`Dependency module '${modulePath}' not found`);
			}

			const parts = require(modulePath);
			const basepath = parts.path || item;
			app.use(`/${key}/${basepath}`, parts.routes(category.auth));
		});
	});
}

app.get('*', (req, res) => res.status(404).message('page-not-found').return());

// Start The Server
app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}`));

module.exports = app;
