import http from "http";
import {AddressInfo} from "net";
import {Session} from "../Session";

const createServer = (): Promise<http.Server> =>
	new Promise<http.Server>((resolve, reject) => {
		const server = http.createServer().listen();

		server.on("listening", () => resolve(server));
		server.on("error", reject);
	});

const closeServer = (server: http.Server): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		if (server.listening) {
			server.close((error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		} else {
			resolve();
		}
	});

const getUrl = (server: http.Server): string =>
	`http://localhost:${(server.address() as AddressInfo).port}`;

const waitForConnect = (session: Session): Promise<void> =>
	new Promise((resolve) => session.on("connected", resolve));

export {createServer, closeServer, getUrl, waitForConnect};
