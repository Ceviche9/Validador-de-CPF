## Validador de CPF.

## 💻 Languages and Tools.

![image](https://camo.githubusercontent.com/9d07c04bdd98c662d5df9d4e1cc1de8446ffeaebca330feb161f1fb8e1188204/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b)
![HTML5](https://img.shields.io/badge/-HTML5-333333?style=flat&logo=HTML5)
![CSS](https://img.shields.io/badge/-CSS-333333?style=flat&logo=CSS3&logoColor=1572B6)



# Interface.

![Big Number](https://user-images.githubusercontent.com/83431609/120951037-5ab9bb80-c71e-11eb-89e7-fe449fa7f8b4.png)

# HTML.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Valida</title>
    <link rel="stylesheet" href="./style.css">

</head>
<body>
    <section class="Caixa">
        <h1>CPF</h1>
        <p>Coloque o número do cpf abaixo para verificar se é válido:</p>
        <input type="text" class="input" placeholder="XXX.XXX.XXX-XX" >
        <button class="btn">enviar</button>
        <p class="resp"></p>
    </section>

    <script src="./cpfValidação.js"></script>
</body>
</html>


```


# Code & Notes.

``` js
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const resp =document.querySelector('.resp');

//Enviando um CPF para saber se é válido->
btn.addEventListener('click', function(e){

   const checar = new ValidaCPF(input.value);
   
   if(checar.valida()) {

        resp.innerText = 'CPF VÁLIDO';    

   }else{

     resp.innerText = 'CPF INVÁLIDO';

   }

})

input.addEventListener('keypress', function(e) {

    valor = input.value.length

    if (valor == 3 || valor == 7){

        input.value += '.'
    }

    if (valor == 11) {

        input.value += '-'
    }
})

function ValidaCPF(cpfEnviado){
    
    Object.defineProperty(this, 'cpfLimpo', {

        enumerable: true,
        get: function() {

            return cpfEnviado.replace(/\D+/g, '');
        }

    })

}

ValidaCPF.prototype.valida = function() {

    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo) return false;
    
    //Para pegar os 9 primeiros dígitos do cpf 
    const cpfParcial = this.cpfLimpo.slice(0, -2); 
    const Digito1 = this.criaDigito(cpfParcial);
    const Digito2 = this.criaDigito(cpfParcial + Digito1);

    const novoCpf = cpfParcial + Digito1 + Digito2

    

    return novoCpf === this.cpfLimpo;
}

//Calculo para encontrar os dígitos finais
ValidaCPF.prototype.criaDigito = function(cpfParcial) {

    //criando um array com os 9 dígitos->
    const cpfArray = Array.from(cpfParcial);
    //criando o contador para usar no reduce()
    let contador = cpfArray.length + 1;

    //Fazendo a soma ->
    const total= cpfArray.reduce((ac, valor) => {

        ac += (contador * Number(valor))
        contador --;
        return ac;

    }, 0);
    
    //Para encontrar o dígito->
    const digito = 11 - (total % 11);
    
    // "Se o dígito for maior que 9 retorna 0, se não retorna o dígito"
    return digito > 9 ? '0' : String(digito);

}
```
