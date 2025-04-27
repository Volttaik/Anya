import cluster from 'node:cluster';
import path from 'node:path';
import fs from 'node:fs';
import { func } from "./lib/index.js";
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let isRunning = false;

async function start(file, newArgs = "") {
    if (isRunning) return;
    isRunning = true;
    const args = [path.join(__dirname, file), newArgs, ...process.argv.slice(2)];
    cluster.setupMaster({
        exec: path.join(__dirname, file),
        args: args.slice(1),
    });
    let runtime = cluster.fork();
    runtime.on('message', data => {
        switch (data[0]) {
            case 'reset':
                runtime.process.exitCode = 0;
                runtime.kill();
                isRunning = false;
                start(file, data[1] || "");
                break;
        }
    });
    runtime.on('exit', async code => {
        isRunning = false;
        if (code === null) {
            console.info("Got 'null' exit code, rebooting in 30 secs.");
            await func.delay(30000);
            start('./server.js');
            return;
        }
        console.error('Exited with code:', code);
        if (code === 0) return;
        fs.watchFile(args[0], () => {
            fs.unwatchFile(args[0]);
            start(file);
        });
    });
}

start('./server.js');
