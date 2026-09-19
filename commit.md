# Padrões de commits 📜

De acordo com a documentação do **[Conventional Commits](https://www.conventionalcommits.org/pt-br)**, commits semânticos são uma convenção simples para ser utilizada nas mensagens de commit. 

## Tipo e descrição 📝
Os commits serão feitos a partir do **tipo** + mudança implementada **EM INGLÊS** e **EM MINÚSCULO** (ex.: _"feat: added homescreenpage"_).

- `feat`- Indicam que seu trecho de código está incluindo um **novo recurso ou funcionalidade**.

- `fix` - Indicam que seu trecho de código está **solucionando um problema**.

- `docs` - Indicam que houveram **mudanças na documentação**, como por exemplo no Readme do seu repositório (não inclui alterações em código).

- `chore` - Indicam **atualizações de tarefas** de build, configurações de administrador, pacotes... como por exemplo adicionar um pacote no gitignore. (Não inclui alterações em código)

- `refactor` - Indicam mudanças devido a **que não alterem sua funcionalidade**, como melhorias. 

- `remove` - Indicam a exclusão de arquivos, diretórios ou funcionalidades não utilizadas, reduzindo o tamanho ou complexidade do projeto e mantendo-o mais organizado.

## Emojis para commits (Opcional) 💈

<table>
  <thead>
    <tr>
      <th>Tipo do commit</th>
      <th>Emoji</th>
      <th>Palavra-chave</th>
      <th>Exemplo</th>
      <th>Resultado</th>
    </tr>
  </thead>
 <tbody>
      <tr>
      <td>Novo recurso</td>
      <td>✨ <code>:sparkles:</code></td>
      <td><code>feat</code></td>
       <td>
        <code>git commit -m ":sparkles: feat: added login page"</code>
      </td>
      <td>✨ feat: added login page</td>
    </tr>
    <tr>
    <tr>
      <td>Documentação</td>
      <td>📚 <code>:books:</code></td>
      <td><code>docs</code></td>
       <td>
        <code>git commit -m ":books: docs: README update"</code>
      </td>
      <td>📚 docs: README update</td>
    </tr>
    <tr>
      <td>Em progresso</td>
      <td>🚧 <code>:construction:</code></td>
      <td><code>feat</code></td>
      <td>
        <code>git commit -m ":construction: feat: register page in progress"</code>
      </td>
      <td>🚧 feat: register page in progress</td>
    </tr>
    <tr>
      <td>Estilização de Interface</td>
      <td>💄 <code>:lipstick:</code></td>
      <td><code>feat</code></td>
       <td>
        <code>git commit -m ":lipstick: feat: added form styles"</code>
      </td>
      <td>💄 feat: added form styles</td>
    </tr>
     <tr>
      <td>Conserto de Bugs</td>
      <td>🐛 <code>:bug:</code></td>
      <td><code>fix</code></td>
       <td>
        <code>git commit -m ":bug: fix: fixed infinite loop"</code>
      </td>
      <td>🐛 fix: fixed infinite loop</td>
    </tr>
    <tr>
      <td>Comentários</td>
      <td>💡 <code>:bulb:</code></td>
      <td><code>docs</code></td>
       <td>
        <code>git commit -m ":bulb: docs: comments on tutorial page"</code>
      </td>
      <td>💡 docs: comments on tutorial page </td>
    </tr>
    <tr>
    <tr>
      <td>Mover/Renomear Arquivos ou Pastas</td>
      <td>🚚 <code>:truck:</code></td>
      <td><code>chore</code></td>
       <td>
        <code>git commit -m ":truck: chore: renamed folder"</code>
      </td>
      <td>🚚 chore: renamed folder </td>
    </tr>
        <td>Refatoração</td>
        <td>♻️ <code>:recycle:</code></td>
        <td><code>refactor</code></td>
         <td>
        <code>git commit -m ":recycle: refactor: improved functionality"</code>
      </td>
      <td>♻️ refactor: improved functionality</td>
    </tr>
    <tr>
      <td>Removendo um arquivo</td>
      <td>🗑️ <code>:wastebasket:</code></td>
      <td><code>remove</code></td>
       <td>
        <code>git commit -m ":wastebasket: remove: removed file"</code>
      </td>
      <td>🗑️ remove: removed file </td>
    </tr>
    <tr>
      <td>Revertendo mudanças</td>
      <td>💥 <code>:boom:</code></td>
      <td><code>fix</code></td>
       <td>
        <code>git commit -m ":boom: fix: comments on tutorial page"</code>
      </td>
      <td>💥 boom: comments on tutorial page </td>
    </tr>
  </tbody>
</table>

# Principais comandos do Git 💻

- `git clone url-do-repositorio-no-github` - Clona um repositório remoto existente no GitHub para o seu ambiente local.

- `git init` - Inicializa um novo repositório Git no diretório atual.

- `git add .` - Adiciona todos os arquivos e alterações no diretório atual para a área de stage (preparando-os para o commit).

- `git commit -m "mensagem do commit"` - Registra as alterações adicionadas na área de stage com uma mensagem descritiva sobre o que foi modificado.

- `git push -u origin main` - Envia os commits da branch main do repositório local para o repositório remoto origin e define main como a branch padrão para futuros push e pull. O -u (ou --set-upstream) configura a branch upstream para facilitar os próximos comandos git push e git pull e eliminar a necessidade de especificar a branch.

- `git fetch` - Busca todas as atualizações do repositório remoto sem integrá-las à branch atual. Isso atualiza as referências remotas.

- `git pull origin main` - Atualiza a branch local main com as mudanças do repositório remoto origin. Combina git fetch e git merge.

- `git push --force-with-lease` - Forma mais segura de forçar o envio de alterações locais para o repositório remoto. Verifica se não houve alterações feitas por outros colaboradores desde sua última atualização local, evitando sobrescrever acidentalmente o trabalho de outros.

- `git revert id_do_commit_que_vai_ser_revertido` - Cria um novo commit que desfaz as alterações feitas pelo commit especificado, preservando o histórico. Útil para desfazer mudanças de forma segura sem reescrever o histórico.

- `git reset --hard id_do_commit_anterior_ao_que_vai_ser_apagado` - Redefine o repositório para o estado do commit especificado, apagando todas as mudanças feitas após esse commit. Ideal para uso local. Para sincronizar remotamente, use `git push --force-with-lease` posteriormente.

- `git commit --amend -m "mensagem_reescrita"` - Altera a mensagem do último commit. Após usar este comando, sincronize remotamente com `git push --force-with-lease`.

- `git cherry-pick HASH_DO_COMMIT` - Utilizado para obter um commit específico. Exemplo de uso: Imagine que você tenha duas branchs (main) e (develop) e na segunda você tem 3 commits mas deseja apenas pegar o primeiro commit dela, com o uso de cherry-pick você pode.

- `git switch <branch>` - Alterna para uma branch diferente no repositório local. Use `git switch -c <branch>` para criar e alternar para uma nova branch.