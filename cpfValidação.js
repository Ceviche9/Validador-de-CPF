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
