# Backend de Upload de Imagens

Este é um servidor backend desenvolvido em Node.js e TypeScript para upload de imagens, utilizando o Cloudflare R2 como armazenamento.

## Funcionalidade

O projeto permite o upload de imagens para o Cloudflare R2, um serviço de armazenamento compatível com S3. Após o upload, o servidor retorna a URL pública da imagem armazenada. O limite de tamanho do arquivo é de 4MB.

## Estrutura do Projeto

```
backend/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── src/
│   ├── env.ts                 # Validação e configuração das variáveis de ambiente
│   ├── server.ts              # Configuração do servidor Fastify
│   ├── functions/
│   │   └── upload-image-to-storage.ts  # Lógica de upload de imagem
│   ├── routes/
│   │   └── upload-image.ts    # Rota para upload de imagens
│   └── storage/
│       ├── storage.ts         # Interface para provedores de armazenamento
│       └── providers/
│           └── r2-storage.ts  # Implementação do provedor R2
```

## Bibliotecas Utilizadas

### Dependências Principais
- **fastify**: Framework web rápido e leve para Node.js
- **@fastify/cors**: Plugin para habilitar CORS
- **@fastify/multipart**: Plugin para lidar com uploads de arquivos multipart
- **@aws-sdk/client-s3**: Cliente S3 do AWS SDK (usado para compatibilidade com R2)
- **@aws-sdk/lib-storage**: Utilitário para uploads de stream
- **zod**: Biblioteca para validação de esquemas

### Dependências de Desenvolvimento
- **typescript**: Superset do JavaScript
- **tsx**: Executor de TypeScript com watch mode
- **@types/node**: Tipos para Node.js

## Configuração

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Configure as variáveis de ambiente criando um arquivo `.env` baseado no `.env.example`:
   ```
   CLOUDFLARE_ACCESS_KEY_ID=your_access_key
   CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
   CLOUDFLARE_BUCKET=your_bucket_name
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_PUBLIC_URL=https://your-domain.com
   ```

3. Execute o servidor em modo de desenvolvimento:
   ```bash
   pnpm run dev
   ```

O servidor estará rodando em `http://localhost:3333`.

## Rotas

### POST /uploads

Rota para upload de imagens.

- **Método**: POST
- **Content-Type**: multipart/form-data
- **Parâmetros**:
  - `file`: Arquivo de imagem (obrigatório)
- **Limites**:
  - Tamanho máximo: 4MB
  - Tipos aceitos: Qualquer tipo de arquivo (validado pelo mimetype)
- **Respostas**:
  - **201 Created**: Upload bem-sucedido
    ```json
    {
      "url": "https://your-domain.com/images/nome-da-imagem.jpg"
    }
    ```
  - **400 Bad Request**: Arquivo inválido ou tamanho excedido
    ```json
    {
      "message": "Invalid file provided."
    }
    ```
    ou
    ```json
    {
      "message": "File size must be a maximum of 4MB."
    }
    ```

## Exemplos de Uso

### Usando cURL

```bash
curl -X POST \
  -F "file=@/caminho/para/sua/imagem.jpg" \
  http://localhost:3333/uploads
```

### Usando JavaScript (Fetch API)

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:3333/uploads', {
  method: 'POST',
  body: formData,
})
.then(response => response.json())
.then(data => {
  console.log('URL da imagem:', data.url);
})
.catch(error => {
  console.error('Erro:', error);
});
```


## Segurança

- O nome do arquivo é sanitizado para remover caracteres especiais
- Limite de tamanho de arquivo implementado
- CORS habilitado para todas as origens (configurável)

## Desenvolvimento

Para contribuir ou modificar o projeto:

1. Certifique-se de que o TypeScript está configurado corretamente
2. Use `pnpm run dev` para desenvolvimento com hot reload
3. Adicione testes se necessário
4. Siga as convenções de código existentes

## Licença

ISC