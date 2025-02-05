import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HashManager } from './services/HashManager';
import { userRouter } from './router/userRouter';
import { postRouter } from './router/postRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
});

// routers das entidades
app.use("/users", userRouter);
app.use("/post", postRouter);
