// Checks how link statuses are sorted, against a tiny local server (no internet needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { linkStatus } from '../src/lib/link-status';

test('link statuses: ok, dead, blocked, other, and HEAD-refusing servers', async () => {
  const server = createServer((req, res) => {
    const code = Number(req.url!.slice(1));
    if (code === 999) {
      // Refuses HEAD but answers GET.
      res.statusCode = req.method === 'HEAD' ? 405 : 200;
    } else res.statusCode = code;
    res.end();
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  try {
    assert.equal((await linkStatus(`${base}/200`)).kind, 'ok');
    assert.equal((await linkStatus(`${base}/404`)).kind, 'dead');
    assert.equal((await linkStatus(`${base}/410`)).kind, 'dead');
    assert.equal((await linkStatus(`${base}/403`)).kind, 'blocked');
    assert.equal((await linkStatus(`${base}/429`)).kind, 'blocked');
    assert.equal((await linkStatus(`${base}/500`)).kind, 'other');
    assert.equal((await linkStatus(`${base}/999`)).kind, 'ok');
    assert.equal((await linkStatus('http://127.0.0.1:1/')).kind, 'blocked');
  } finally {
    server.close();
  }
});
