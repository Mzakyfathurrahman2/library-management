import express from 'express';
import cors from 'cors';
import { GREETING } from '@library/shared';
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: GREETING });
});
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map