const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/meucrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definindo o modelo (Schema) para o Mongoose
const ItemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    preco: Number,
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

// Rotas CRUD

// CREATE: Adicionar um novo item
app.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ: Listar todos os itens
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ: Obter um item pelo ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item não encontrado" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE: Atualizar um item pelo ID
app.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: "Item não encontrado" });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Remover um item pelo ID
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item não encontrado" });
        res.json({ message: "Item deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
