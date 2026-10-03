# Padronizando Commits 📜

De acordo com a documentação do **[Conventional Commits](https://www.conventionalcommits.org/pt-br)**, commits semânticos são uma convenção simples para ser utilizada nas mensagens de commit. 

## Tipos de Commit 📝

- `feat` - Indica a adição de uma **nova funcionalidade ou recurso** ao projeto.

- `fix` - Indica a **correção de um erro ou problema** no código.

- `docs` - Indica alterações relacionadas à **documentação**, como mudanças no `README`, comentários ou arquivos de instrução.

- `chore` - Indica alterações de **manutenção do projeto** que não afetam diretamente a funcionalidade, como atualização de dependências, configurações ou organização de arquivos.

- `refactor` - Indica uma **reestruturação ou melhoria interna do código** sem alterar seu comportamento ou funcionalidade.

- `cleanup` - Indica uma **limpeza no código**, como remoção de comentários desnecessários ou qualquer outro ajuste para melhorar a legibilidade.

- `remove` - Indica a **remoção de arquivos, diretórios, código ou funcionalidades** que não são mais necessários.

Ou seja...

 **COMMIT** = `TIPO` + `breve descrição do que foi feito` (em **inglês**, **minúsculo** e até 50 caracteres). 
- Por exemplo: _"feat: added homescreenpage"_.

## Uso de Emojis em Commits 💈

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
        <code>git commit -m ":bulb: docs: added comments on tutorial page"</code>
      </td>
      <td>💡 docs: comments on tutorial page </td>
    </tr>
    <tr>
      <td>Manutenção de Arquivos/Pastas</td>
      <td>🚚 <code>:truck:</code></td>
      <td><code>chore</code></td>
       <td>
        <code>git commit -m ":truck: chore: renamed folder"</code>
      </td>
      <td>🚚 chore: renamed folder </td>
    </tr>
    <tr>
        <td>Refatoração</td>
        <td>♻️ <code>:recycle:</code></td>
        <td><code>refactor</code></td>
         <td>
        <code>git commit -m ":recycle: refactor: improved functionality"</code>
      </td>
      <td>♻️ refactor: improved functionality</td>
    </tr>
      <tr>
        <td>Limpeza</td>
        <td>🧹 <code>:broom:</code></td>
        <td><code>cleanup</code></td>
         <td>
        <code>git commit -m ":broom: cleanup: removed commentary"</code>
      </td>
      <td>🧹 cleanup: removed commentary </td>
    </tr>
    <tr>
      <td>Remoção de elementos</td>
      <td>🗑️ <code>:wastebasket:</code></td>
      <td><code>remove</code></td>
       <td>
        <code>git commit -m ":wastebasket: remove: deleted file"</code>
      </td>
      <td>🗑️ remove: deleted file </td>
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

# Comandos Git Essenciais 💻

- `git clone <url-do-repositorio>`  
  Clona um repositório remoto para o computador.

- `git init`  
  Inicializa um repositório Git no diretório atual.

- `git add .`  
  Adiciona todas as alterações à área de stage.

- `git commit -m "mensagem"`  
  Cria um commit com as alterações adicionadas.

- `git push -u origin main`  
  Envia a branch `main` ao repositório remoto e define seu upstream.

- `git fetch`  
  Busca atualizações do repositório remoto sem aplicá-las à branch atual.

- `git pull origin main`  
  Busca e integra as alterações da branch `main` remota.

- `git push --force-with-lease`  
  Força o push com uma verificação de segurança para evitar sobrescrever alterações remotas inesperadas.

- `git revert <id-do-commit>`  
  Cria um novo commit que desfaz as alterações de um commit anterior.

- `git reset --hard <id-do-commit>`  
  Retorna o repositório ao commit indicado, descartando alterações posteriores.

- `git commit --amend -m "nova mensagem"`  
  Altera a mensagem do último commit.

- `git cherry-pick <hash-do-commit>`  
  Aplica um commit específico de outra branch à branch atual.

- `git switch <branch>`  
  Alterna para outra branch.

- `git switch -c <branch>`  
  Cria uma nova branch e alterna para ela.

---

## Referências 
- Conventional Commits. Disponível em: <https://www.conventionalcommits.org/pt-br/v1.0.0/>. Acesso em: 9 set.. 2026.

- IURICODE. GitHub - iuricode/padroes-de-commits: Padrões de commits. Disponível em: <https://github.com/iuricode/padroes-de-commits>. Acesso em: 9 set.. 2026.

- Git - git Documentation. Disponível em: <https://git-scm.com/docs/git/pt_BR>. Acesso em: 9 set.. 2026.
