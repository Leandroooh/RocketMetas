// Desestruturação e Importação de módulos
const { select, input, checkbox } = require('@inquirer/prompts');

let message = '';

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

    // Desmarcando todas as metas, para evitar erros
    metas.forEach((m) => {
        m.checked = false;
    });

    if (answers.length == 0) {
        console.log('Você não marcou nenhuma meta.');
        return;
    };


    // Marcando as metas escolhidas pelo usuário
    answers.forEach((answer) => {
        const meta = metas.find((m) => {
            return m.value === answer;
        });
        meta.checked = true;
    });
}

const performedMeta = async () => {
    const completed = metas.filter((m) => {
        return true;
    });

    if (completed.length == 0) {
        console.log('Não existem metas disponíveis! 😒');
        return;
    }

    await select({
        message: 'Metas Realizadas',
        choices: [...completed] // spread operator (...)
    });
}

const pendingMeta = async () => {

    const pending = metas.filter((m) => {
        return !m.checked;
    });

    if (pending.length == 0) {
        console.log('Não existem metas pendentes!');
        return;
    }

    await select({
        message: 'Metas Pendentes',
        choices: [...pending] // spread operator (...)
    });

}

const deleteMeta = async () => {

    // desmarcando as metas, formatando o objeto.
    const selectedMetas = metas.map((m) => {
        return { value: m.value, checked: false };
    })

    const deleteItems = await checkbox({
        message: 'Use as setas para se movimentar entre as metas, o espaço para marcar e/ou desmarcar e o enter para finalizar a meta',
        // ... = "Duplicar os dados de Metas, sem alteração no inicial"
        choices: [...selectedMetas],
    });

    if (deleteItems.length == 0) {
        console.log('Você não marcou nenhuma meta para deletar.');
        return;
    }

    deleteItems.forEach((item) => {
        // se verdadeiro passa e fica na lista do filtro
        metas.filter((m) => {
            // Andar ( Metas ) é diferente de andar (selecionado)? Deleta.
            return m.value != item;
        })
    })

    console.log(`Meta(s) deletada(s) com sucesso!`)

}

const createMessage = ({
    c
});

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
                    name: 'Metas Realizadas',
                    value: 'realizadas' // Valor que será utilizado no case
                },
                {
                    name: 'Metas Pendentes',
                    value: 'pendentes' // Valor que será utilizado no case
                },
                {
                    name: 'Deletar Metas',
                    value: 'deletar' // Valor que será utilizado no case
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
            case 'realizadas':
                performedMeta();
                break;
            case 'pendentes':
                pendingMeta();
                break;
            case 'deletar':
                deleteMeta();
                break;
            case 'sair':
                console.log('Aguardamos seu retorno...')
                return;
        }

    }

}

start()