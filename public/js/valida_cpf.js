// 705.484.450-52   070.987.720-03 ----CPF para testes----
class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    eSequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
    }

    geraNovoCpf(){
        const cpfSemDigito = this.cpfLimpo.slice(0, -2)
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);
        this.novoCpf = cpfSemDigito + digito1 + digito2
    }

    static geraDigito(cpfSemDigito){
        let total = 0;
        let reverso = cpfSemDigito.length + 1

        for(let stringNumerica of cpfSemDigito){
            total += reverso * Number(stringNumerica); 
            reverso --
        }

        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }

    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false
        if(this.cpfLimpo.length !== 11) return false
        if(this.eSequencia()) return false
        this.geraNovoCpf()
        //console.log(this.novoCpf)

        return this.novoCpf === this.cpfLimpo
    }
}

export default ValidaCPF;





// <!-- <div id="cpfError" style="color: red; display: none;"></div>     required-->

                  
//                    <!-- <script>
//                     document.addEventListener('DOMContentLoaded', function() {
//                       const cpfInput = document.getElementById('cpf');
                  
//                       cpfInput.addEventListener('input', function(e) {
//                         let value = e.target.value.replace(/\D/g, '');
//                       if (value.length > 11) {
//                           value = value.slice(0, 11);
//                         }
//                         if (value.length > 6) {
//                           value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
//                         }
//                         if (value.length > 10) {
//                           value = value.replace(/(\d{3}\.\d{3})(\d{1,3})/, '$1.$2');
//                         }
//                         if (value.length > 12) {
//                           value = value.replace(/(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2');
//                         }
//                         e.target.value = value;
//                       });
//                     });
//                   </script>  -->