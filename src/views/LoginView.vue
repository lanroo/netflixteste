<template>
    <div class="login-container bg-cover bg-center h-screen" :style="{ backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/ce449112-3294-449a-b8d3-c4e1fdd7cff5/web/BR-pt-20241202-TRIFECTA-perspective_a59cedf7-54b2-4c2d-b309-0c1a84fceabc_small.jpg')` }">
      <div class="overlay bg-black bg-opacity-70 h-full w-full absolute"></div>
      <div class="login-content relative z-10 flex justify-center items-center h-full">
        <div class="login-form bg-black bg-opacity-80 p-8 rounded-md max-w-md mx-auto">
          <h1 class="text-white text-3xl font-bold mb-6">Entrar</h1>
          <Form @submit="onSubmit" class="space-y-6">
            <!-- Campo de E-mail -->
            <div>
              <label for="email" class="block text-gray-400 mb-2">E-mail ou número de celular</label>
              <Field
                id="email"
                name="email"
                type="text"
                placeholder="Digite seu e-mail ou número de celular"
                class="input-field"
                :class="{ 'border-red-500': errors.email }"
              />
              <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
            </div>
  
            <!-- Campo de Senha -->
            <div>
              <label for="password" class="block text-gray-400 mb-2">Senha</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                class="input-field"
                :class="{ 'border-red-500': errors.password }"
              />
              <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
            </div>
  
            <!-- Botão de Login -->
            <button type="submit" class="w-full py-3 bg-red-600 text-white text-lg rounded-md hover:bg-red-700">
              Entrar
            </button>
          </Form>
  
          <!-- Outras opções -->
          <div class="text-gray-400 mt-4 text-center">
            <p>OU</p>
            <button class="py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 mt-4">
              Usar um código de acesso
            </button>
          </div>
  
          <!-- Links adicionais -->
          <div class="text-gray-400 mt-6 text-center">
            <a href="#" class="text-white hover:underline">Esqueceu a senha?</a>
            <div class="mt-4">
              <input type="checkbox" id="remember" class="mr-2" />
              <label for="remember">Lembre-se de mim</label>
            </div>
          </div>
  
          <!-- Informações adicionais -->
          <div class="text-gray-400 mt-6 text-center text-sm">
            <p>
              Novo por aqui? <a href="#" class="text-white underline">Assine agora</a>.
            </p>
            <p class="mt-4">
              Esta página é protegida pelo Google reCAPTCHA para garantir que você não seja um robô.
              <a href="#" class="text-blue-500 underline">Saiba mais.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router"; // Importar o roteador
  import { useForm, Field, ErrorMessage, Form } from "vee-validate";
  import * as yup from "yup";
  
  // Instanciar o roteador
  const router = useRouter();
  
  // Esquema de validação com Yup
  const schema = yup.object({
    email: yup
      .string()
      .required("Informe um email ou número de telefone válido")
      .email("Formato inválido"),
    password: yup.string().required("Senha é obrigatória"),
  });
  
  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  
  // Mock da validação de login
  const mockUsers = [{ email: "test@test.com", password: "123456" }];
  
  const onSubmit = (values) => {
    const user = mockUsers.find(
      (u) => u.email === values.email && u.password === values.password
    );
    if (user) {
      // Redireciona para a página inicial (Home)
      router.push("/home");
    } else {
      alert("Email ou senha inválidos.");
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  .login-content {
    z-index: 10;
  }
  
  .login-form {
    width: 100%;
    max-width: 400px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 4px;
    background-color: #222;
    color: white;
  }
  
  .input-field:focus {
    border-color: #e50914;
    outline: none;
  }
  </style>
  