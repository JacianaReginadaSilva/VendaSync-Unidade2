VendaSync v2 - Sistema de Gestão 
Inteligente 
Este projeto representa a evolução da Atividade 1, onde transformamos um site estático em 
uma aplicação estruturada com Back-end e Programação Orientada a Objetos. 
�
�
Evolução do Sistema (Resumo) 
● Design: Mudamos de uma interface clara para um design Dark Mode/Glassmorphism 
mais profissional e moderno. 
● Arquitetura: Adicionamos uma camada de Back-end com Node.js. 
● Organização: O código agora utiliza POO (Classes) para gerenciar Produtos e Pedidos. 
● Funcionalidade: Implementamos persistência de dados real via arquivos JSON. 
�
�
Aplicação da Ementa (Checklist Técnico) 
● Programação Orientada a Objetos: Classes Produto (pai) e ProdutoFisico (filha), 
utilizando herança e polimorfismo. 
● Node.js: Execução de scripts via terminal e manipulação de arquivos com o módulo fs. 
● Armazenamento: Persistência automática no arquivo produtos.json. 
● Async/Await: Consultas assíncronas à Brasil API para validação de endereços por CEP. 
● Validação: Métodos internos nas classes que impedem o cadastro de preços inválidos. 
�
�
Estrutura de Arquivos 
● index.html: Interface visual (Front-end). 
● venda_sync_back.js: Lógica de servidor e terminal (Back-end). 
● produtos.json: Banco de dados do catálogo. 
● ultimo_pedido.json: Registro do último pedido simulado. 
�
�
Como Executar 
1. Instale o Node.js. 
2. No terminal, execute: node venda_sync_back.js. 
3. Para ver o front-end, abra o arquivo index.html em seu navegador. 