import app = require("teem");

class Index {
	public index(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/index.html");
	}

	public catalogo(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/catalogo.html");
	}

	public compra(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra.html");
	}

	public compra2(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra2.html");
	}

	public compra3(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra3.html");
	}

	public compra4(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra4.html");
	}

	public compra5(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra5.html");
	}

	public compra6(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/compra6.html");
	}

}

export = Index;
