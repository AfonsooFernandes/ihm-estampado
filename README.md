# Estampado - Sistema de Estampagem Personalizada

## Trabalho / Assignment #3

### Constituição do Grupo
- Afonso Fernandes (29344)
- Pedro Correia (29241)

### Objetivo
Desenvolver aplicações web colaborativas e interativas que integrem conceitos de desenvolvimento Full-Stack Web, colaboração em tempo real, gestão de dados e segurança, resolvendo problemas reais por meio de funcionalidades úteis e interação entre utilizadores.

### Tema
**Sistema de Estampagem de Fotos à Medida**

### Descrição
É uma aplicação onde utilizadores autenticados podem personalizar artigos com fotos e recebê-los em casa. A aplicação é dividida em um ambiente Web, otimizado para desktop, e uma versão móvel para uma experiência touch.

### Funcionalidades
- **Autenticação:** Registo e login utilizando JWT.
- **Personalização de Artigos:** Utilizadores podem escolher artigos (ex: capas de telemóveis, t-shirts, bonés) e personalizá-los com suas próprias fotos.
- **Gestão de Encomendas:** Criação e gerir pedidos, visualização do estado de cada pedido.
- **Atualizações em Tempo Real:** Utilização de WebSockets para notificar os utilizadores sobre o estado de suas encomendas.

### Tecnologias
- **Frontend:** CSS, JavaScript, React para construção de interfaces dinâmicas.
- **Backend:** Node.js (+ Express) para lógica de negócios e APIs RESTful.
- **Base de Dados:** MongoDB para armazenamento de dados dos utilizadores, artigos e encomendas.
- **Autenticação:** JWT para gestão de sessões seguras.
- **Comunicação em Tempo Real:** WebSockets (via Socket.IO) para atualizações instantâneas.

### Build / Install / Configure
```bash
npm install
 Configurar .env com as seguintes variáveis:
 DB_URI - string de conexão para o MongoDB
 JWT_SECRET - chave secreta para JWT
npm run dev