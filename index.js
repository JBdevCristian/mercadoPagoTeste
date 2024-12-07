const express = require('express');
const {MercadoPagoConfig, Preference} = require('mercadopago'); // Importando as classes corretas
const app = express();

// Passo 2: Inicializar o cliente com o access_token
const client = new MercadoPagoConfig({
    accessToken: 'TEST-2662120828044942-120521-43c3012464ac2a4943fb9c43156007e5-630425698'
});

const preference =  new Preference(client);

// Passo 3: Inicializar a API de pagamento
//const payment = new Payment(client);

app.get('/', (req, res) => {
    res.send('Olá mundo!');
});

app.get('/pagar', async (req, res) => {

    const id = `${Date.now()}`;
    const email = "jbcristian40@gmail.com";


    /*
    console.log('Iniciando pagamento...');

    

    const body = {
            transaction_amount: 12.34,
            description: '<DESCRIPTION>',
            payment_method_id: 'pix',
            payer: {
                email: email
            }
        }

    const requestOptions = {
            idempotencyKey: id,
        };

    payment.create({ body, requestOptions }).then(resposta => {
        console.log(resposta)
        res.redirect(resposta.body.init_point)
    }).catch(error => {
        console.log(error)
    });
    */

    var dados = {
        body: {
          items: [
            {
              id: id,
              title: 'Testando Produto Mercado Pago',
              quantity: 1,
              unit_price: parseFloat(2000)
            }
          ],
          payer: {
            email: email
          },
          external_reference: id
        }
      }

      try {
        var pagamento = await preference.create(dados);
        console.log(pagamento)
        return res.redirect(pagamento.init_point);
      } catch (error) {
        return console.log(error)
      }


});

app.post('/not', (req, res) => {
    console.log(req.query)
    res.send('ok')
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
