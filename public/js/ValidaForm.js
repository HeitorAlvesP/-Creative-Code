class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.evento();
    }

    evento() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposSaoValidos = this.camposSaoValidos(); 
        const senhasvalidas = this.senhasSaoValidas();

        if (camposSaoValidos && senhasvalidas) {
            alert('Formulário enviado');
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Os campos senha e repetir senha precisam ser iguais');
            this.criaErro(repetirSenha, 'Os campos senha e repetir senha precisam ser iguais');
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaErro(senha, 'A senha precisa ter entre 6 e 12 caracteres');
            this.criaErro(repetirSenha, 'A senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }

    camposSaoValidos() {
        let valid = true;

        // Remove mensagens de erro anteriores
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.criaErro(campo, `"${label}" não pode estar em branco`);
                valid = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }
        }

        return valid;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

// Instanciando a validação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const valida = new ValidaFormulario();
});