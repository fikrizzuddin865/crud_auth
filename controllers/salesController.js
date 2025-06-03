const db = require('../config/db');

exports.createSale = (req, res) => {
  const { user_id, total_amount } = req.body;

  let cashback = 0;
  if (total_amount > 1000000) cashback = total_amount * 0.10;
  else if (total_amount > 500000) cashback = total_amount * 0.05;

  const sql = 'INSERT INTO sales (user_id, total_amount, cashback_amount) VALUES (?, ?, ?)';
  db.query(sql, [user_id, total_amount, cashback], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({
      message: 'Penjualan dicatat',
      data: { user_id, total_amount, cashback }
    });
  });
};

exports.getSalesByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT * FROM sales WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getTotalCashbackByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT SUM(cashback_amount) AS total_cashback FROM sales WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({
      user_id: userId,
      total_cashback: results[0].total_cashback || 0
    });
  });
};
