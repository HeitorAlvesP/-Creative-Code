class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.evento();
    }


    evento(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        });
    }



    handleSubmit(e){
        e.preventDefault();
        const camposSaoValidos = this.camposSaoValidos(); 
        const senhasvalidas = this.senhasSaoValidas();

        if(camposSaoValidos && senhasvalidas){
            alert('formulario enviado')
            this.formulario.submit();
        }
    }

    senhasSaoValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('#password')
        const repetirSenha = this.formulario.querySelector('#confirm_password')

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precia ser iguais')
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precia ser iguais')
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false
            this.criaErro(senha, 'Senha precisa conter entre 6 e 12 caracteres')
            this.criaErro(repetirSenha, 'Senha precisa conter entre 6 e 12 caracteres')
        }

        return valid;
    }

    camposSaoValidos(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value){
                this.criaErro(campo, `"${label}" Não pode estar em branco`)
                valid = false
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUser(campo)) valid = false;
            }
        }

        return valid;
    }


    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value)

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido.');
            return false
        }

        return true;
    }


    validaUser(campo){
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário deverá ter entre 3 e 12 caracteres')
            valid = false
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Usuário deverá ter entre 3 e 12 caracteres')
            valid = false
        }

        return valid;  
    }


    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();