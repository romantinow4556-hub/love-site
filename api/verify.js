// 邀请码列表 — 添加/删除邀请码直接修改这个数组
const VALID_CODES = [
  { code: 'zhangandcheng', name: '张和程' },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.body || {};
  if (!code) return res.status(400).json({ error: 'Missing code' });

  const found = VALID_CODES.find(c => c.code === code);
  if (found) {
    return res.status(200).json({ ok: true, name: found.name || '' });
  }
  return res.status(401).json({ ok: false, error: '邀请码无效，请联系管理员' });
}
