const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP not found' });
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the address' });
    }
});

module.exports = router;