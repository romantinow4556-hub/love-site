// 邀请码列表 — 和 verify.js 保持同步
const VALID_CODES = [
  { code: 'zhangandcheng', name: '张和程' },
];

function checkAdmin(req) {
  const pwd = req.headers['x-admin-password'] || (req.method === 'GET' ? (req.query?.pwd || '') : (req.body?.adminPwd || ''));
  return pwd === process.env.ADMIN_PASSWORD;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!checkAdmin(req)) {
    return res.status(403).json({ error: '密码错误' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ codes: VALID_CODES });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
