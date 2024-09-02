let saldo = 0; // Inicia o Saldo
let extrato = []; //Armazenamento do Extrato

// Função para alternar o tipo de campo de senha
function visualizarSenha() {
    // Obtém o campo de senha pelo ID
    let campoSenha = document.getElementById('password');
    // Obtém o botão de alternância pela classe
    let botaoAlternar = document.querySelector(".toggle-password");

    // Alterna entre os tipos de campo de senha e texto
    if (campoSenha.type === 'password') { //verificar se é igual e do mesmo tipo
        campoSenha.type = 'text'; // Torna a senha visível
        botaoAlternar.textContent = "🙈"; // Ícone para senha visível
    } else {
        campoSenha.type = 'password'; // Torna a senha oculta
        botaoAlternar.textContent = "👁️"; // Ícone para senha oculta
    }
}

// Função para validar o login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Obtém os valores dos campos
    let campoSenha = document.getElementById('password').value;
    let campoNome = document.getElementById('name').value;
    let mensagemErro = document.getElementById('error-message');

    // Valida os dados
    if (campoSenha === '3589') { // Verifica se a senha é correta
        // Oculta o contêiner atual e mostra o novo contêiner
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.container2').style.display = 'flex';

        // Mensagem de boas-vindas
        document.getElementById('welcome-message').textContent = `Olá, ${campoNome}! É um prazer ter você por aqui!`;

        mensagemErro.style.display = 'none'; // Oculta a mensagem de erro
    } else {
        // Exibe a mensagem de erro
        mensagemErro.textContent = "Senha incorreta!";
        mensagemErro.style.display = 'block'; // Mostra a mensagem de erro
    }
});


// função paraa realizar ações com base no botão clicado

document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
        // Obtém o ID do botão clicado
        let action = this.id;
        let senhaCorreta = false;
        if (action !== 'deposito') {
            // Continua solicitando a senha até que seja correta ou o usuário cancele
            while (!senhaCorreta) {
                let password = prompt("Digite Sua Senha: ");
                if (password === null) {
                    alert("Operação cancelada.");
                    return;
                }
                if (password === '3589') {
                    senhaCorreta = true;
                } else {
                    alert("Senha Incorreta. Tente novamente.");
                }
            }
        }

        switch (action) {
            case 'checkSaldo':
                alert(`Seu Saldo é de R$ ${saldo.toFixed(2)}`);
                break;

            case 'verExtrato':
                if (extrato.length === 0) {
                    alert("Nenhuma transação registrada.")
                }else{
                    alert(`Extrato:\n ${extrato.join("\n")}`);
                }
                break;

            case 'saque':
                let valorSaque = parseFloat(prompt("Digite o valor do saque: "));
                if (isNaN(valorSaque) || valorSaque <= 0) {
                    alert("operação não autorizada: Valor inválido.");
                    break;
                }
                if (valorSaque > saldo) {
                    alert("operação não autorizada: Saldo insuficiente.");
                    break;
                }
                saldo -= valorSaque;
                extrato.push(`Saque de R$ ${valorSaque.toFixed(2)}`);
                alert(`Saque realizado com sucesso! Saldo Atual: R$ ${saldo.toFixed(2)}`);
                break;

            case 'deposito':
                let valorDeposito = parseFloat(prompt("Digite o valor do depósito:"));
                if (isNaN(valorDeposito) || valorDeposito <= 0) {
                    alert("Operação não autorizada: Valor inválido para depósito.");
                    break;
                }
                saldo += valorDeposito;
                extrato.push(`Depósito de R$ ${valorDeposito.toFixed(2)}`);
                alert(`Depósito realizado com sucesso! Saldo Atual: R$ ${saldo.toFixed(2)}`);
                break;

            case 'transfer':
                let NumerConta = prompt("Digite o número da conta que deseja relizar a transferência:");
                if (!/^\d+$/.test(NumerConta)) {
                    alert("Operação não autorizada: Número da Conta inválido.");
                    break;
                }

                let valorTransferencia = parseFloat(prompt("Digite o valor da transferencia:"));
                if (isNaN(valorTransferencia) || valorTransferencia <= 0) {
                    alert("Operação não autorizada: Valor da transferencia.");
                    break;
                }
                if (valorTransferencia > saldo) {
                    alert("Operação não autorizada: Saldo insuficiente.");
                    break;
                }
                saldo -= valorTransferencia;
                extrato.push(`Transferência de R$ ${valorTransferencia.toFixed(2)} para Conta ${NumerConta}`);
                alert(`Transferência realizada com sucesso! Saldo Atual: R$ ${saldo.toFixed(2)}`);
                break;

            case 'sair':
                alert(`${document.getElementById('name').value}, foi um prazer ter você por aqui!`);
                document.querySelector('.container').style.display = 'flex';
                document.querySelector('.container2').style.display = 'none';
                document.getElementById('name').value = '';
                document.getElementById('password').value = '';
                break;

                default:
                alert("Ação não identificada.");
                break;
        }
    });
});