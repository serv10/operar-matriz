# API Operaciones a las matrices Q y R

Este servicio proporciona una API que llama a otra para obtener la factorización QR de una matriz para luego realizar determinados procesos

## Instrucciones de Ejecución

Para ejecutar correctamente esta aplicación, asegúrese de contar con los siguientes requisitos:

  - Node.js versión **23.11.0** o superior
  - `npm` instalado
  - Docker

### Pasos para ejecutar localmente
1. Clonar el repositorio

2. Instalar las dependencias del proyecto
    ```bash
    npm install
    ```

3. Crear un archivo .env en la raiz del proyecto con los siguientes variables:
    ```text
    PORT=
    NODE_API_URL=
    NODE_ENV=
    HOST=
    SECRET_KEY=
    REFRESH_SECRET_KEY=
    ```

  - NODE_API_URL: Esta variable guarda la url de la api de factorizacion.
  - Establece NODE_ENV=development.

4. Compilar la aplicación
    ```bash
    npm run build
    ```

5. Ejecutar la aplicación
    ```bash
    npm start
    ```

### Pasos para ejecutar en Docker
1. Clonar el repositorio

2. Crear una red de Docker (solo si no usas Docker Compose)
  Esto para comunicar ambas apis y establecerlas en una misma red
    ```bash
    docker network create matriz-network
    ```

3. Construir la imagen Docker  
  Desde la raíz del proyecto de la API ejecutar:
    ```bash
    docker build -t operaciones-api .
    ```

4. Crear un archivo .env en la raiz del proyecto con los siguientes variables:
    ```text
    PORT=  
    NODE_API_URL=  
    NODE_ENV=  
    HOST=  
    SECRET_KEY=  
    REFRESH_SECRET_KEY=  
    ```

  - NODE_API_URL: Debe configurarse con la URL interna del servicio de factorización.  
  Cuando se ejecuta dentro de Docker, utiliza el nombre del servicio del contenedor (por ejemplo, refactorizacion-api) como hostname en lugar de localhost.

5. Ejecutar el contenedor
    ```bash
    docker run -d \
    --name operaciones-api \
    --env-file .env \
    -p 4000:4000 \
    --network matriz-network \
    operaciones-api
    ```

5. Acceder a la API con localhost

### Endpoint
  - **POST /api/v1/auth/token**  
  Genera un token JWT de acceso y un refresh token.  
  Cuerpo de la solicitud:
    ```json
    {
      "usuario": "usuario-demo"
    }
    ```
    En este ejemplo no hay autenticación real, pero es necesario utilizarlo porque se valida que exista un token para realizar las peticiones correctamente (middleware).


  - POST /api/v1/auth/refresh:  
  Genera un nuevo token de acceso a partir de un refresh token válido.  
  Cuerpo de la solicitud:
    ```json
      {
        "refreshToken": "<JWT-de-refresh>"
      }
    ```

  - POST /api/v1/analizar-matriz:  
  Se debe enviar en el cuerpo de la solicitud una matriz rectangular, a traves de la variable **matriz**, para obtener las matrices Q y R, la factorización de la matriz dada.  
  Internamente se procesan operaciones como:
    - Valor máximo: El valor máximo encontrado en las matrices.
    - Valor mínimo: El valor mínimo encontrado en las matrices.
    - Promedio: El promedio de todos los valores de las matrices.
    - Suma total: La suma total de todos los valores de las matrices.
    - Matriz diagonal: Verificar si alguna matriz es diagonal.  
    
    Y se retorna como repuesta todos esos valores más las matrices Q y R.  

    Cuerpo de la solicitud
    ```json
    {
      "matriz": [
        [2,3],
        [2,4],
        [1,1]
      ]
    }
    ```

    Repuesta:
    ```json
    {
      "valorMaximo": 5,
      "valorMinimo": -0.6666666667,
      "suma": 10.3333333334,
      "promedio": 1.0333333333,
      "esQDiagonal": false,
      "esRDiagonal": false,
      "matrizQ": [
        [
          0.6666666667,
          -0.3333333333
        ],
        [
          0.6666666667,
          0.6666666667
        ],
        [
          0.3333333333,
          -0.6666666667
        ]
      ],
      "matrizR": [
        [
          3,
          5
        ],
        [
          0,
          1
        ]
      ]
    }
    ``` 

