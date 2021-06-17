import app = require("teem");
import Kit = require("../../models/kit");

class KitApi {
	public async listar(req: app.Request, res: app.Response) {

		let kits: Kit[] = null;

		await app.sql.connect(async (sql) => {

			kits = await sql.query("SELECT id_kit, nome_kit, valor_kit, disp FROM kit");

		});

		res.json(kits);
	}

	@app.route.methodName("obter/:id_kit")
	public async obter(req: app.Request, res: app.Response) {

		const id_kit = parseInt(req.params["id_kit"]);

		if (isNaN(id_kit)) {
			res.status(400).json("Id inválido");
			return;
		}

		let kit: Kit = null;

		await app.sql.connect(async (sql) => {

			let kits: Kit[] = await sql.query("SELECT id_kit, nome_kit, valor_kit, disp FROM kit WHERE id_kit = ?", [id_kit]);

			if (kits.length) {
				kit = kit[0];
			}

		});

		res.json(kit);
	}

	@app.http.delete()
	@app.route.methodName("excluir/:id_kit")
	public async excluir(req: app.Request, res: app.Response) {

		const id_kit = parseInt(req.params["id_kit"]);

		if (isNaN(id_kit)) {
			res.status(400).json("Id inválido");
			return;
		}

		let kitExcluido = false;

		await app.sql.connect(async (sql) => {

			await sql.query("DELETE FROM kit WHERE id_kit = ?", [id_kit]);

			if (sql.affectedRows > 0) {
				kitExcluido = true;
			}

		});

		if (!kitExcluido) {
			res.status(400).json("Kit não encontrado");
			return;
		}

		res.sendStatus(204);
	}

	@app.http.post()
	public async criar(req: app.Request, res: app.Response) {

		const kit: Kit = req.body;

		if (!kit) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (kit.nome_kit) {
			kit.nome_kit = kit.nome_kit.trim();
		}

		kit.valor_kit = parseFloat(kit.valor_kit as any);

		kit.disp = parseFloat(kit.disp as any);

		if (!kit.nome_kit || isNaN(kit.valor_kit) || isNaN(kit.disp) || kit.valor_kit < 0 || kit.disp < 0) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (kit.nome_kit.length > 50) {
			res.status(400).json("Nome muito longo");
			return;
		}

		let erro: string = null;

		await app.sql.connect(async (sql) => {

			try {
				await sql.query("INSERT INTO kit (nome_kit, valor_kit, disp) VALUES (?, ?, ?)", [kit.nome_kit, kit.valor_kit, kit.disp]);

				kit.id_kit = await sql.scalar("SELECT last_insert_id()");
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					erro = `O kit "${kit.nome_kit}" já existe`;
				else
					throw e;
			}

		});

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.json(kit.id_kit);
	}

	@app.http.put()
	public async alterar(req: app.Request, res: app.Response) {

		const kit: Kit = req.body;

		if (!kit) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (kit.nome_kit) {
			kit.nome_kit = kit.nome_kit.trim();
		}

		kit.valor_kit = parseFloat(kit.valor_kit as any);

		kit.disp = parseFloat(kit.disp as any);

		if (!kit.nome_kit || isNaN(kit.valor_kit) || isNaN(kit.disp) || kit.valor_kit < 0 || kit.disp < 0) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (kit.nome_kit.length > 50) {
			res.status(400).json("Nome muito longo");
			return;
		}

		let kitAlterado = false;
		let erro: string = null;

		await app.sql.connect(async (sql) => {

			try {
				await sql.query("UPDATE kit SET nome_kit = ?, valor_kit = ?, disp = ? WHERE id_kit = ?", [kit.nome_kit, kit.valor_kit, kit.disp, kit.id_kit]);

				if (sql.affectedRows > 0) {
					kitAlterado = true;
				}
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					erro = `O kit "${kit.nome_kit}" já existe`;
				else
					throw e;
			}

		});

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		if (!kitAlterado) {
			res.status(400).json("Kit não encontrado");
			return;
		}

		res.sendStatus(204);
	}

}

export = KitApi;
