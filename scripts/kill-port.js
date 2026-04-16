import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const port = Number(process.env.PORT) || 3000;

async function getPidsOnWindows(targetPort) {
  const { stdout } = await execAsync(`netstat -ano -p tcp`);
  const rows = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const pids = new Set();

  for (const row of rows) {
    const parts = row.split(/\s+/);
    if (parts.length < 5 || parts[0] !== "TCP") continue;

    const localAddress = parts[1];
    const pid = parts[4];

    // Match exact port at the end of IPv4/IPv6 local addresses.
    if (localAddress.endsWith(`:${targetPort}`)) {
      pids.add(pid);
    }
  }

  return [...pids];
}

async function getPidsOnUnix(targetPort) {
  try {
    const { stdout } = await execAsync(`lsof -ti tcp:${targetPort}`);
    return stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch (error) {
    // lsof exits non-zero when no process is found; treat as empty result.
    if (error?.code === 1) return [];
    throw error;
  }
}

async function killPid(pid) {
  if (process.platform === "win32") {
    await execAsync(`taskkill /PID ${pid} /F`);
    return;
  }

  process.kill(Number(pid), "SIGTERM");
}

async function main() {
  const pids =
    process.platform === "win32"
      ? await getPidsOnWindows(port)
      : await getPidsOnUnix(port);

  if (pids.length === 0) {
    console.log(`No process found on port ${port}.`);
    return;
  }

  for (const pid of pids) {
    await killPid(pid);
  }

  console.log(`Stopped process(es) on port ${port}: ${pids.join(", ")}`);
}

main().catch((error) => {
  console.error(`Failed to stop process on port ${port}.`, error.message);
  process.exit(1);
});
