import app = require("teem");
import appsettings = require("./appsettings");

app.run({
	sqlConfig: appsettings.sqlConfig
});
