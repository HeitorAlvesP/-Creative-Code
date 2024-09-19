import ValidaCPF from "./valida_cpf";

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('form');
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
        const senhasSaoValidas = this.senhasSaoValidas();

        if (camposSaoValidos && senhasSaoValidas) {
            this.enviarFormulario();
        }
    }

    async enviarFormulario() {
        const formData = new FormData(this.formulario);
        const data = new URLSearchParams(formData).toString();
        const cpfError = document.getElementById('cpfError');

        try {
            const response = await fetch(this.formulario.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                window.location.href = 'login.html'; 
            } else {
                if (cpfError) {
                    cpfError.textContent = result.error || 'Erro ao processar o formulário.';
                    cpfError.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            if (cpfError) {
                cpfError.textContent = 'Erro ao processar o formulário.';
                cpfError.style.display = 'block';
            }
        }
    }

    senhasSaoValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('#password'); 
        const repetirSenha = this.formulario.querySelector('#confirm_password'); 

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos de Senhas não coincidem');
            this.criaErro(repetirSenha, 'Campos de Senhas não coincidem');
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

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        const campos = this.formulario.querySelectorAll('input'); 
        for (let campo of campos) {
            const label = campo.previousElementSibling ? campo.previousElementSibling.innerText : '';

            if (!campo.value) {
                this.criaErro(campo, `"${label}" não pode estar em branco`);
                valid = false;
            }

            // Validação de CPF
            if (campo.id === 'cpf') {
                console.log('Validando CPF:', campo.value); // Adicionado para depuração
                const cpf = new ValidaCPF(campo.value);
                if (!cpf.valida()) {
                    this.criaErro(campo, 'CPF inválido');
                    valid = false;
                }
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

document.addEventListener('DOMContentLoaded', function() {
    const valida = new ValidaFormulario();
});