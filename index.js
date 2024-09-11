// Desestruturação e Importação de módulos
const { select, input, checkbox } = require('@inquirer/prompts');

let metas = [];

const createMeta = async () => {
    const meta = await input({ message: "Digite sua meta!" });

    if (meta.length == 0) {
        console.log('Você não digitou nenhuma meta.');
        return;
    };

    metas.push({ value: meta, checked: false });
    console.log(`Meta cadastrada com sucesso: ${meta}`);
};

const listMeta = async () => {
    if (metas.length == 0) {
        console.log('Você não possui nenhuma meta cadastrada.');
        return;
    };

    const answers = await checkbox({
        message: 'Use as setas para se movimentar entre as metas, o espaço para marcar e/ou desmarcar e o enter para finalizar a meta',
        choices: [...metas], // ... = "Duplicar os dados de Metas, sem alteração no inicial"
    });

    if (answers.length == 0) {
        console.log('Você não marcou nenhuma meta.');
        return;
    };

    // Desmarcando todas as metas, para evitar erros
    metas.forEach((m) => {
        m.checked = false;
    });

    // Marcando as metas escolhidas pelo usuário
    answers.forEach((answer) => {
        const meta = metas.find((m) => {
            return m.value === answer;
        });
        meta.checked = true;
    });
}

// async - Precisa esperar ?
const start = async () => {

    while (true) {

        // await - Espere
        const option = await select({
            message: '',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar' // Valor que será utilizado no case
                },
                {
                    name: 'Listar Metas',
                    value: 'listar' // Valor que será utilizado no case
                },
                {
                    name: 'Sair',
                    value: 'sair' // Valor que será utilizado no case
                },
            ],
        });

        switch (option) {
            case 'cadastrar':
                await createMeta();
                break;

            case 'listar':
                await listMeta();
                break;

            case 'sair':
                console.log('Aguardamos seu retorno...')
                return;
        }

    }

}

start()