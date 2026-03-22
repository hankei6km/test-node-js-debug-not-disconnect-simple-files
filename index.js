import process from 'node:process';
import childProcess from 'node:child_process';

async function start(no) {
  const w=childProcess.spawn('node', [`worker${no}.js`], {
    stdio: 'inherit',
    detached: true,
  });
  await new Promise((resolve) => w.on('exit', resolve));
}


async function main() {
  console.log(`--- start main [${process.pid}] ---`);
  await Promise.all([
    start(1),
    start(2),
    start(3),
  ]);
  console.log(`--- done [${process.pid}] ---`);
}

main();